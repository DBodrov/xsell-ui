const getImageUrlFromBucket = (imageName: string) => `https://cash.otpbank.ru/public/images/${imageName}.png`;

const LandingImages = {
    LANDING_TEST_1: [
        { src: getImageUrlFromBucket('construction_375w'), sizes: 375, maxWidth: 375 },
        { src: getImageUrlFromBucket('construction_750w'), sizes: 750, maxWidth: 750 },
    ],
    LANDING_TEST_2: [
        { src: getImageUrlFromBucket('couple_375w'), sizes: 375, maxWidth: 375 },
        { src: getImageUrlFromBucket('couple_750w'), sizes: 750, maxWidth: 750 },
    ],
    LANDING_TEST_3: [
        { src: getImageUrlFromBucket('firstGirl_375w'), sizes: 375, maxWidth: 375 },
        { src: getImageUrlFromBucket('firstGirl_750w'), sizes: 750, maxWidth: 750 },
    ],
    LANDING_TEST_4: [
        { src: getImageUrlFromBucket('woman_375w'), sizes: 375, maxWidth: 375 },
        { src: getImageUrlFromBucket('woman_750w'), sizes: 750, maxWidth: 750 },
    ],
};

export const getlandingKey = (id: number) => {
    const landingKeys = Object.keys(LandingImages).map((lk: string) => lk);
    // console.log(landingKeys);
    return landingKeys[id];
};

export function getLandingImagesSet(landingCode: string) {
    return LandingImages[landingCode];
}
