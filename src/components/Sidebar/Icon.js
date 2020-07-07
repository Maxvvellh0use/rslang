import React from 'react';
import { ReactComponent as WordsIcon } from '../../assets/img/icons_navbar/words.svg';
import { ReactComponent as GamesIcon} from '../../assets/img/icons_navbar/games.svg';
import { ReactComponent as SettingsIcon } from '../../assets/img/icons_navbar/settings.svg';
import { ReactComponent as StatsIcon } from '../../assets/img/icons_navbar/stats.svg';
import { ReactComponent as AboutIcon } from '../../assets/img/icons_navbar/about.svg';
import { ReactComponent as LogOutIcon } from '../../assets/img/icons_navbar/logout.svg';
import { ReactComponent as DictionaryIcon } from '../../assets/img/icons_navbar/dictionary.svg';

const Icon = (props) => {
  switch(props.name) {
    case "words":
        return <WordsIcon />;
    case "games":
        return <GamesIcon />;
    case "settings":
        return <SettingsIcon />;
    case "stats":
        return <StatsIcon />;
    case "about":
        return <AboutIcon />;
    case "logout":
        return <LogOutIcon />;
    case "dictionary":
        return <DictionaryIcon />
  }
}

export default Icon;