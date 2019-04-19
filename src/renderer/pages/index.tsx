import React from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { remote } from 'electron';
import CircleProgress from '@/components/circleProgress';

export default function() {
    const a: string = 's';
    const { window } = remote.getGlobal('services');
    return (
        <div className="adsfadf">
            <CircleProgress color={[0, 0, 0, 1]} />
        </div>
    );
}
