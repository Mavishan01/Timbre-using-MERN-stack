import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Banner from './Banner';
import '../styles/styles.css';

const CarouselComponent = () => {
    const [settings] = useState({ autoPlay: true, indicators: false });

    const items = [
        {
            Name: "Guitar",
            contentPosition: "left",
            Items: [
                { Name: "Electric Guitar", Image: "https://ychef.files.bbci.co.uk/624x351/p072v7x0.jpg" },
                { Name: "Bass guitar", Image: "https://mitchellguitars.com/wp-content/uploads/2018/11/Mitchell-FB-Series-Bass-Main-Mobile.jpg" },
            ],
        },
        {
            Name: "Violin",
            contentPosition: "middle",
            Items: [
                { Name: "Violin", Image: "https://phamoxmusic.com/wp-content/uploads/2023/01/The-Violin-Theme-Picture-PIC800.jpg" },
                { Name: "Cello", Image: "https://ourculturemag.com/wp-content/uploads/2020/03/cello.jpg" },
            ],
        },
        {
            Name: "KeyBoards",
            contentPosition: "right",
            Items: [
                { Name: "KeyBoard", Image: "https://usa.yamaha.com/files/keyboardsindex_6aecfb3aa62a2ecfca1204dea45918da.jpg?impolicy=resize&imwid=4648&imhei=2848" },
                { Name: "Pianos", Image: "https://www.yamaha.com/us/pianos/images/premium-header-9772f2b7.jpg" },
            ],
        },
    ];

    return (
        <div className="example-container">
            <Carousel {...settings} className="example-carousel">
                {items.map((item, index) => (
                    <Banner key={index} item={item} contentPosition={item.contentPosition} />
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselComponent;