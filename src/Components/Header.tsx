import React from 'react';
import guildLogo from '/logoNname.webp'

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="logoContainer">
      <a href="https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=Order" target="_blank">
        <img src={guildLogo} className="logo" alt="guild logo" />
      </a>
    </div>
  );
}

export default Header;
