import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Banner from './Banner';
import '../styles/styles.css';

const CarouselComponent = () => {
    const [settings] = useState({ autoPlay: true, indicators: false });

    const items = [
        {
            Name: "Guitars",
            contentPosition: "left",
            Items: [
                { Name: "Electric Guitars", Image: "https://ychef.files.bbci.co.uk/624x351/p072v7x0.jpg" },
                { Name: "Bass guitars", Image: "https://mitchellguitars.com/wp-content/uploads/2018/11/Mitchell-FB-Series-Bass-Main-Mobile.jpg" },
            ],
            Paragraph1: "Unlock your musical potential with a guitar—whether you're strumming your first chord or shredding electrifying solos, the guitar is your gateway to endless creativity. Versatile and timeless, it fits seamlessly into any genre, from rock to blues, jazz to folk. With every note, you can express emotion, create new sounds, and connect with listeners in powerful ways. Start your journey today and feel the magic of making music come alive in your hands. A guitar is more than an instrument—it's your personal key to a world of musical expression!",
        },
        {
            Name: "Violins",
            contentPosition: "middle",
            Items: [
                { Name: "Violins", Image: "https://phamoxmusic.com/wp-content/uploads/2023/01/The-Violin-Theme-Picture-PIC800.jpg" },
                { Name: "Cellos", Image: "https://ourculturemag.com/wp-content/uploads/2020/03/cello.jpg" },
            ],
            Paragraph2: "Immerse yourself in the beauty and precision of the violin—an instrument known for its rich, expressive sound and timeless appeal. Whether you're just starting out or looking to master new techniques, the violin offers a perfect balance of challenge and reward. From classical masterpieces to modern tunes, the violin lets you create music that moves the heart and soul. Begin your journey with this elegant instrument and bring your passion for music to life!",
        },
        {
            Name: "KeyBoards",
            contentPosition: "right",
            Items: [
                { Name: "KeyBoards", Image: "https://usa.yamaha.com/files/keyboardsindex_6aecfb3aa62a2ecfca1204dea45918da.jpg?impolicy=resize&imwid=4648&imhei=2848" },
                { Name: "Pianos", Image: "https://www.yamaha.com/us/pianos/images/premium-header-9772f2b7.jpg" },
            ],
            Paragraph3: "Discover the power and versatility of keyboards—whether you're composing, performing, or learning, a keyboard offers endless musical possibilities. With rich tones, dynamic sound, and a wide range of styles at your fingertips, it's the perfect instrument for any skill level. Start exploring your musical creativity today and unlock a world of sound!",
        },
    ];

    return (
        <div className="example-container">
            <Carousel {...settings} className="example-carousel">
                {items.map((item, index) => (
                    <Banner
                        key={index}
                        item={item}
                        contentPosition={item.contentPosition}
                        paragraphIndex={(index % 3) + 1}  // Ensure the index is between 1 and 3
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselComponent;