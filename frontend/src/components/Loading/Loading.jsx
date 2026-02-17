import React from 'react';
import './Loading.css';

export default function Loading() {
    return (
        <div className='loading_wrapper'>
            <div className="loading_details">
                <div className="loading_container">
                    <div className='loading_image'></div>
                    <div className='loading_content'>
                        <h5 className='loading_line'></h5>
                        <h5 className='loading_line'></h5>
                        <h5 className='loading_line'></h5>
                        <h5 className='loading_line'></h5>
                        <h5 className='loading_line'></h5>
                        <h5 className='loading_line'></h5>


                    </div>
                </div>
            </div>

        </div>
    );
}
