import React from 'react';
import Team from '../../../components/about-us/team/team';
import Organization from '../../../components/about-us/organization/organization';
import MissionVision from '@/components/about-us/mission-vision/mission-vision';

const AboutPage = () => {
    return (
        <div className='bg-white'>
            <Team />
            <Organization />
            <MissionVision />
        </div>
    );
};

export default AboutPage;