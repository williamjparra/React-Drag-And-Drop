import React from 'react'
import { Card, Loader, Dimmer } from 'semantic-ui-react'
import './loading.css'

export default function LoadingComponent() {
    return (
        <Card>
            <Dimmer className="card-loading" active>
                <Loader 
                    size='huge' 
                    inline={false}
                >
                    Loading Image
                </Loader>
            </Dimmer>
        </Card>
    )
}
