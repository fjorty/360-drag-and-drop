import React, { useState, useEffect } from 'react';
import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd';

import './App.css';

import SMLogo1 from './assets/svg/sm-logo-1.svg';
import SMLogo2 from './assets/svg/sm-logo-2.svg';
import SMLogo3 from './assets/svg/sm-logo-3.svg';
import SMLogo5 from './assets/svg/sm-logo-5.svg';
import SMLogo6 from './assets/svg/sm-logo-6.svg';
import SMLogo7 from './assets/svg/sm-logo-7.svg';
import SMLogo8 from './assets/svg/sm-logo-8.svg';
import SMLogo9 from './assets/svg/sm-logo-9.svg';
// import SMLogo10 from './assets/svg/sm-logo-10.svg';
import SMLogo11 from './assets/svg/sm-logo-11.svg';
import SMLogo12 from './assets/svg/sm-logo-12.svg';

const App = () => {
  const getMobileDetect = (userAgent) => {
    const isAndroid = () => Boolean(userAgent.match(/Android/i));
    const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
    const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
    const isWindows = () => Boolean(userAgent.match(/IEMobile/i));
    const isSSR = () => Boolean(userAgent.match(/SSR/i));
  
    const isMobile = () => Boolean(isAndroid() || isIos() || isOpera() || isWindows());
    const isDesktop = () => Boolean(!isMobile() && !isSSR());
    return {
      isMobile,
      isDesktop,
      isAndroid,
      isIos,
      isSSR
    };
  };

  const useMobileDetect = () => {
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
    return getMobileDetect(userAgent);
  };

  const HandleResize = () => {
    setIsMobile(useMobileDetect().isMobile());
  }

  const [isMobile, setIsMobile] = useState(useMobileDetect().isMobile());
  const [items, setItems] = useState([
    { id: 1, name: 'linkedin', url: SMLogo1 },
    { id: 2, name: 'twitter', url: SMLogo2 },
    { id: 3, name: 'instagram', url: SMLogo3 },
    // {id: 4, name: 'youtube', url: SMLogo4 },
    { id: 5, name: 'pinterest', url: SMLogo5 },
    { id: 6, name: 'snapchat', url: SMLogo6 },
    { id: 7, name: 'dribble', url: SMLogo7 },
    { id: 8, name: 'hangouts', url: SMLogo8 },
    { id: 9, name: 'facebook', url: SMLogo9 },
    // { id: 10, name: 'idk10', url: SMLogo10 },
    { id: 11, name: 'messenger', url: SMLogo11 },
    { id: 12, name: 'whatssapp', url: SMLogo12 }
  ]);

  useEffect(() => {
    window.addEventListener('resize', HandleResize);
    return () => window.removeEventListener('resize', HandleResize);
  });

  const onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
    const nextState = swap(items, sourceIndex, targetIndex);

		return setItems(nextState);
  }

  return (
    <GridContextProvider onChange={onChange}>
      <div className='title'>My360 Demo</div>
      <div className='container'>
        <GridDropZone className='dropzone' boxesPerRow={isMobile ? 2 : 5} rowHeight={120}>
          {items.map((item) => (
            <GridItem key={item.name}>
              <div className='grid-item'>
                <img className='grid-item-img'
                     src={item.url}
                     alt={'sm-logo-' + item.id} />
                <div className="grid-item-content">
                  {item.name.toUpperCase()}
                </div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
}

export default App;
