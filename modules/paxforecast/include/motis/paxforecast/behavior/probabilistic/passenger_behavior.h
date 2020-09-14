#pragma once

#include <random>
#include <vector>

#include "utl/enumerate.h"
#include "utl/to_vec.h"

#include "motis/paxmon/passenger_group.h"

#include "motis/paxforecast/alternatives.h"
#include "motis/paxforecast/measures/measures.h"

namespace motis::paxforecast::behavior::probabilistic {

template <typename Generator, typename TransferDistribution>
struct passenger_behavior {
  passenger_behavior(Generator& gen, TransferDistribution& transfer_dist,
                     unsigned sample_count)
      : gen_{gen}, transfer_dist_{transfer_dist}, sample_count_{sample_count} {}

  std::vector<float> pick_routes(
      motis::paxmon::passenger_group const& /*grp*/,
      std::vector<alternative> const& alternatives,
      std::vector<measures::please_use> const& /*announcements*/) {
    if (alternatives.empty()) {
      return {};
    }
    auto probabilities = std::vector<float>(alternatives.size());
    for (auto i = 0U; i < sample_count_; ++i) {
      sample(alternatives, probabilities);
    }
    for (auto& p : probabilities) {
      p /= sample_count_;
    }
    return probabilities;
  }

private:
  inline void sample(std::vector<alternative> const& alternatives,
                     std::vector<float>& probabilities) {
    auto best_score = 0.0F;
    auto best_alternatives = std::vector<std::size_t>{};
    for (auto const& [idx, alt] : utl::enumerate(alternatives)) {
      auto const transfer_weight = static_cast<float>(transfer_dist_(gen_));
      auto const score = static_cast<float>(alt.duration_) +
                         transfer_weight * static_cast<float>(alt.transfers_);
      if (score == best_score) {
        best_alternatives.emplace_back(idx);
      } else if (score < best_score) {
        best_score = score;
        best_alternatives.clear();
        best_alternatives.emplace_back(idx);
      }
    }
    for (auto const idx : best_alternatives) {
      probabilities[idx] += 1.0F / static_cast<float>(best_alternatives.size());
    }
  }

  Generator& gen_;
  TransferDistribution& transfer_dist_;
  unsigned sample_count_{};
};

}  // namespace motis::paxforecast::behavior::probabilistic