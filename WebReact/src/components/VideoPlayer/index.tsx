import React, { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react';

import styles from './VideoPlayer.module.scss';

interface VideoPlayerProps {
    videoUrl: string;
    children?: ReactNode;
}

export interface VideoPlayerHanlde {
    test: () => void;
}

const VideoPlayer = forwardRef<VideoPlayerHanlde, VideoPlayerProps>((props, ref) => {
    const [videoSrc, setVideoSrc] = useState<string | null>(null);

    useImperativeHandle(
        ref,
        () => ({
            test() {
                console.log('Use video player');
            },
        }),
        [],
    );

    useEffect(() => {
        if (props.videoUrl) {
            setVideoSrc(props.videoUrl);
        }
    }, [props.videoUrl]);

    return (
        <div className={styles.wrapper}>
            {videoSrc ? (
                <video controls>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
});
export default VideoPlayer;
