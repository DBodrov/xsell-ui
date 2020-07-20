export type TLandingCode = 'LANDING_TEST_1' | 'LANDING_TEST_2' | 'LANDING_TEST_3' | 'LANDING_TEST_4';
export type LandingProps = { landingCode: TLandingCode | string; onNextPage(): void };
