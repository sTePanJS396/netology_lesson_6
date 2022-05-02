import React, { Component } from 'react';
import './Clock.css'

export default class Clock extends Component {
    constructor(props) {
        super(props)
        this.state = {style: {hours: '', minutes: '', seconds: ''}, day: new Date(), setting: {hh: 0, mm: 0, ss: 0}, deviation: this.props.deviation};
        this.deg = 6;
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(prev => (
                {
                    day: new Date(), 
                    setting: 
                        {
                            hh: ((prev.day.getHours() + (prev.day.getTimezoneOffset()) / 60) + (prev.deviation)) * 30, 
                            mm: prev.day.getMinutes()  * this.deg, 
                            ss: prev.day.getSeconds() * this.deg
                        }, 
                    style:
                        {
                            hours: `rotateZ(${(prev.setting.hh) + (prev.setting.mm/12)}deg)`,  //hh
                            minutes: `rotateZ(${prev.setting.mm}deg)`, //mm
                            seconds: `rotateZ(${prev.setting.ss}deg)` //ss
                        },
                }
            ))
            // console.log(this.state.setting.hh, this.state.setting.mm, this.state.setting.ss);
        }, 1000)
        // console.log('Отклонение в часах', this.state.day.getTimezoneOffset() / 60);
        // console.log('Текущий час', this.state.day.getHours());
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <div className='clock-block'>
                <span onClick={() => this.props.onRemove(this.props.id)}>X</span>
                <div className='clock-title'>{this.props.city}</div>
                <div className="clock">
                    <div className="hour">
                        <div className="hr" id="hr" style={{transform: this.state.style.hours}}></div>
                    </div>
                    <div className="min">
                        <div className="mn" id="mn" style={{transform: this.state.style.minutes}}></div>
                    </div>
                    <div className="sec">
                        <div className="sc" id="sc" style={{transform: this.state.style.seconds}}></div>
                    </div>
                </div>
            </div>
        )
    }
}
