import React from 'react';
import './style.css';
import Window from '../Window/Window';
import Player from '../Player/Player';
import { useOrder } from '../../contexts/OrderContext';

interface OnlineMembersProps {
}

const OnlineMembers: React.FC<OnlineMembersProps> = () => {
    const { members } = useOrder();

    const onlineMembers = () => {
        return members?.filter(member => member.status === 'online');
    };

    const onlineMembersByLevel = () => {
        return onlineMembers()?.sort((a, b) => b.level - a.level);
    };

    function sharingMinLevel(level: number) {
        return Math.trunc(level - level / 3);
    }

    function sharingMaxLevel(level: number) {
        return Math.trunc(level + level / 2);
    }

    return (
        <Window title={'Membros Online - ' + onlineMembers().length} isOpen={true}>
            {members.length === 0 && 'carregando...'}
            {onlineMembersByLevel()?.map(member => {
                return (
                    <div className="onlineMember" key={member.name}>
                        <Player player={member} />
                        <img src={'sharedMember.gif'} alt="sharing" height="11px" width="11px" className="sharingIcon" />
                        <span>{sharingMinLevel(member.level) + '-' + sharingMaxLevel(member.level)}</span>
                    </div>
                );
            })}
        </Window>
    );
};

export default OnlineMembers;
