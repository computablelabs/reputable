declare const fetchChallenge: (challengeID: string) => any;
interface RegistryChallengeListingParams {
    listingHash: string;
    userAddress: string;
}
declare const challengeListing: ({ listingHash, userAddress }: RegistryChallengeListingParams) => any;
declare const resetRegistryChallenges: () => any;
export { fetchChallenge, challengeListing, resetRegistryChallenges, };
