import React from 'react';
import Index from '..';
import { Transport, TransportInfo, WalkInfo } from './ConnectionTypes';

const isTransportInfo = (transport: Transport) => {
    return transport.move_type === 'Transport';
}

let arrLength = 0;

const isArrLengthOne = (transports: Transport[]) => {
    arrLength = transports.length;
    return transports.length === 1;
}

const transportForLoop = (transports: Transport[]) => {
    var elements = [];
    var percentage = 0;
    var rangeMax = transports[transports.length - 1].move.range.to;
    var prevLength = 0;
    for (let index = 0; index < transports.length; index++) {
        percentage = (transports[index].move.range.to - transports[index].move.range.from) / rangeMax;
        elements.push(
            isTransportInfo(transports[index]) ?
                <g className={'part train-class-' + (transports[index].move as TransportInfo).category_id + ' acc-0'} key={index}>
                    <line x1={prevLength} y1='12' x2={(percentage * 326 + prevLength)} y2='12' className='train-line'></line>
                    <circle cx={prevLength + 4} cy='12' r='12' className='train-circle'></circle>
                    <use xlinkHref={classToId((transports[0].move as TransportInfo).category_id)} className='train-icon' x='4' y='4' width='16' height='16'></use>
                    <text x={prevLength - 6} y='40' textAnchor='start' className='train-name'>{(transports[index].move as TransportInfo).name}</text>
                    <rect x={prevLength} y='0' width={(percentage * 326 + prevLength)} height='24' className='tooltipTrigger'></rect>
                </g>
                :
                <g className='part train-class-walk acc-0' key={index}>
                    <line x1={prevLength} y1='12' x2={(percentage * 326 + prevLength)} y2='12' className='train-line'></line>
                    <circle cx={prevLength + 4} cy='12' r='12' className='train-circle'></circle>
                    <use xlinkHref='#walk' className='train-icon' x='4' y='4' width='16' height='16'></use>
                    <text x={prevLength - 6} y='40' textAnchor='start' className='train-name'></text>
                    <rect x={prevLength} y='0' width={(percentage * 326 + prevLength)} height='24' className='tooltipTrigger'></rect>
                </g>
        );
        prevLength = prevLength + (percentage * 326);
    }
    return elements;
}

const classToId = (classz: Number) => {
    console.log(classz);
    switch (classz) {
        case 0:
            return '#plane';
            break;
        case 1:
            return '#train';
            break;
        case 2:
            return '#train';
            break;
        case 3:
            return '#bus';
            break;
        case 4:
            return '#train';
            break;
        case 5:
            return '#train';
            break;
        case 6:
            return '#train';
            break;
        case 7:
            return '#sbahn';
            break;
        case 8:
            return '#ubahn';
            break;
        case 9:
            return '#tram';
            break;
        case 10:
            return '#ship';
            break;
        case 11:
            return '#bus';
            break;
        default:
            return '#bus';
            break;
    }
}

export const ConnectionRender: React.FC<{ 'transports': Transport[] }> = (props) => {
    return (
        <svg width='335' height='40' viewBox='0 0 335 40'>
            <g>
                {isArrLengthOne(props.transports) ?
                    isTransportInfo(props.transports[0]) ?
                        <g className={'part train-class-' + (props.transports[0].move as TransportInfo).category_id + ' acc-0'}>
                            <line x1='0' y1='12' x2='326' y2='12' className='train-line'></line>
                            <circle cx='4' cy='12' r='12' className='train-circle'></circle>
                            <use xlinkHref={classToId((props.transports[0].move as TransportInfo).category_id)} className='train-icon' x='4' y='4' width='16' height='16'></use>
                            <text x='-6' y='40' textAnchor='start' className='train-name'>{(props.transports[0].move as TransportInfo).name}</text>
                            <rect x='0' y='0' width='323' height='24' className='tooltipTrigger'></rect>
                        </g>
                        :
                        <g className='part train-class-walk acc-0'>
                            <line x1='0' y1='12' x2='326' y2='12' className='train-line'></line>
                            <circle cx='4' cy='12' r='12' className='train-circle'></circle>
                            <use xlinkHref='#walk' className='train-icon' x='4' y='4' width='16' height='16'></use>
                            <text x='0' y='40' textAnchor='start' className='train-name'></text>
                            <rect x='0' y='0' width='323' height='24' className='tooltipTrigger'></rect>
                        </g>
                    :
                    transportForLoop(props.transports)
                }
            </g>
            <g className='destination'><circle cx='329' cy='12' r='6'></circle></g>
        </svg>
    );
};