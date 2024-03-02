import React, {Component} from 'react'

export class ComponentSpinner extends Component {
    render() {
        return (
            <div
                className="spinner show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                <div className="spinner-grow text-primary" role="status"></div>
            </div>
        )
    }
}

export default ComponentSpinner
