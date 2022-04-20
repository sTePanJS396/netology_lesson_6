import React, { Component } from 'react';
import './Clock.css'

export default class Clock extends Component {
    constructor(props) {
        super(props)
        this.state = {style: {hours: '', minuts: '', seconds: ''}, day: new Date(), setting: {hh: 0, mm: 0, ss: 0}, deviation: 0};
        this.deg = 6;
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(prev => (
                {...prev,
                    day: new Date(), 
                    setting: 
                        {
                            hh: ((this.state.day.getHours() + (this.state.day.getTimezoneOffset()) / 60) + (this.state.deviation)) * 30, 
                            mm: this.state.day.getMinutes()  * this.deg, 
                            ss: this.state.day.getSeconds() * this.deg
                        }, 
                    style:
                        {
                            hours: `rotateZ(${(this.state.setting.hh) + (this.state.setting.mm/12)}deg)`,  //hh
                            minuts: `rotateZ(${this.state.setting.mm}deg)`, //mm
                            seconds: `rotateZ(${this.state.setting.ss}deg)` //ss
                        },
                    deviation: this.props.deviation
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
                        <div className="mn" id="mn" style={{transform: this.state.style.minuts}}></div>
                    </div>
                    <div className="sec">
                        <div className="sc" id="sc" style={{transform: this.state.style.seconds}}></div>
                    </div>
                </div>
            </div>
        )
    }
}
