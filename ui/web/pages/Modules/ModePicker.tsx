import React, { useState } from 'react';
import { Translations } from './Localization';

import { SearchOptions } from './PPRTypes';

export interface Mode {
    mode_type: string,
    mode: { search_options: SearchOptions}
}


export const Modepicker: React.FC<{'translation': Translations, 'start': boolean/*, 'modes': Mode[], 'setModes': React.Dispatch<React.SetStateAction<Mode[]>>*/}> = (props) => {
    
    // FootSelected
    const [footSelected, setFootSelected] = useState<boolean>(false);//(props.modes[0].mode_type === 'FootPPR' || props.modes[0].mode_type === 'Foot');

    // FootMaxDurationSlider
    const [footMaxDurationSlider, setFootMaxDurationSlider] = useState<number>(30);//(props.modes[0].mode.search_options.duration_limit);

    // BikeSelected
    const [bikeSelected, setBikeSelected] = useState<boolean>(false);//(props.modes[1].mode_type === 'Bike');

    // BikeMaxDurationSlider
    const [bikeMaxDurationSlider, setBikeMaxDurationSlider] = useState<number>(30);//(props.modes[1].mode.search_options.duration_limit);

    // CarSelected
    const [carSelected, setCarSelected] = useState<boolean>(false);//(props.modes[2].mode_type === 'Car' || props.modes[2].mode_type === 'CarParking');

    // CarSelected
    const [carMaxDurationSlider, setCarMaxDurationSlider] = useState<number>(30);//(props.modes[2].mode.search_options.duration_limit);

    // Mode-Picker-Visible
    const [modePickerVisible, setModePickerVisible] = useState<boolean>(false);
    
    return (
        <div className='mode-picker'>
            <div className='mode-picker-btn' onClick={() => setModePickerVisible(true)}>
                            <div className={footSelected ? 'mode enabled' : 'mode'}><i className='icon'>directions_walk</i></div>
                            <div className={bikeSelected ? 'mode enabled' : 'mode'}><i className='icon'>directions_bike</i></div>
                            <div className={carSelected ? 'mode enabled' : 'mode'}><i className='icon'>directions_car</i></div>
                        </div>
                        <div className='mode-picker-editor' style={modePickerVisible ? {display: 'flex'} : {display: 'none'}}>
                            <div className='header'>
                                <div className='sub-overlay-close' onClick={() => setModePickerVisible(false)}><i className='icon'>close</i></div>
                                <div className='title'>{props.start ? props.translation.search.startTransports : props.translation.search.destinationTransports}</div>
                            </div>
                            <div className='content'>
                                <fieldset className='mode walk'>
                                    <legend className='mode-header'><label><input type='checkbox' defaultChecked={footSelected} onClick={() => setFootSelected(!footSelected)}/>{props.translation.connections.walk}</label>
                                    </legend>
                                    <div className='option'>
                                        <div className='label'>{props.translation.search.searchProfile.profile}</div>
                                        <div className='profile-picker'><select>
                                                <option value='default'>{props.translation.searchProfiles.default}</option>
                                                <option value='accessibility1'>{props.translation.searchProfiles.accessibility1}</option>
                                                <option value='wheelchair'>{props.translation.searchProfiles.wheelchair}</option>
                                                <option value='elevation'>{props.translation.searchProfiles.elevation}</option>
                                            </select></div>
                                    </div>
                                    <div className='option'>
                                        <div className='label'>{props.translation.search.maxDuration}</div>
                                        <div className='numeric slider control'><input type='range' min='0'
                                                max='30' step='1' value={footMaxDurationSlider} onChange={(e) => setFootMaxDurationSlider(e.currentTarget.valueAsNumber)} /><input type='text' value={footMaxDurationSlider} onChange={(e) => setFootMaxDurationSlider(e.currentTarget.valueAsNumber > 30 ? 30 : e.currentTarget.valueAsNumber)} /></div>
                                    </div>
                                </fieldset>
                                <fieldset className='mode bike'>
                                    <legend className='mode-header'><label><input type='checkbox' defaultChecked={bikeSelected} onClick={() => setBikeSelected(!bikeSelected)}/>{props.translation.connections.bike}</label></legend>
                                    <div className='option'>
                                        <div className='label'>{props.translation.search.maxDuration}</div>
                                        <div className='numeric slider control' ><input type='range' min='0'
                                                max='30' step='1' value={bikeMaxDurationSlider} onChange={(e) => setBikeMaxDurationSlider(e.currentTarget.valueAsNumber)} /><input type='text' value={bikeMaxDurationSlider} onChange={(e) => setBikeMaxDurationSlider(e.currentTarget.valueAsNumber > 30 ? 30 : e.currentTarget.valueAsNumber)} /></div>
                                    </div>
                                </fieldset>
                                <fieldset className='mode car'>
                                    <legend className='mode-header'><label><input type='checkbox' defaultChecked={carSelected} onClick={() => setCarSelected(!carSelected)}/>{props.translation.connections.car}</label>
                                    </legend>
                                    <div className='option'>
                                        <div className='label'>{props.translation.search.maxDuration}</div>
                                        <div className='numeric slider control'><input type='range' min='0'
                                                max='30' step='1' value={carMaxDurationSlider} onChange={(e) => setCarMaxDurationSlider(e.currentTarget.valueAsNumber)} /><input type='text' value={carMaxDurationSlider} onChange={(e) => setCarMaxDurationSlider(e.currentTarget.valueAsNumber > 30 ? 30 : e.currentTarget.valueAsNumber)} /></div>
                                    </div>
                                    <div className='option'><label><input type='checkbox' />{props.translation.search.useParking}</label></div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
    )
}