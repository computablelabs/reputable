"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model = 'registry';
const getRegistry = (state = {}) => {
    const stateItem = state[model];
    if (!stateItem) {
        return undefined;
    }
    return stateItem.data;
};
exports.getRegistry = getRegistry;
const getRegistryAddress = (state = {}) => {
    const registry = getRegistry(state);
    if (!registry || !registry.address) {
        return '';
    }
    return registry.address;
};
exports.getRegistryAddress = getRegistryAddress;
const getListings = (state = {}) => {
    const registry = getRegistry(state);
    if (!registry) {
        return [];
    }
    if (!registry.listings) {
        return [];
    }
    return Object.values(registry.listings);
};
exports.getListings = getListings;
const getListing = (state = {}, key) => {
    const registry = getRegistry(state);
    if (!registry) {
        return undefined;
    }
    if (!registry.listings) {
        return undefined;
    }
    return registry.listings[key];
};
exports.getListing = getListing;
const getAppliedListings = (state = {}) => {
    const listings = getListings(state);
    return listings.filter((listing) => !listing.whitelisted);
};
exports.getAppliedListings = getAppliedListings;
const getWhitelistedListings = (state = {}) => {
    const listings = getListings(state);
    return listings.filter((listing) => listing.whitelisted);
};
exports.getWhitelistedListings = getWhitelistedListings;
const getChallenges = (state = {}) => {
    const registry = getRegistry(state);
    if (!registry) {
        return [];
    }
    if (!registry.challenges) {
        return [];
    }
    return Object.values(registry.challenges);
};
exports.getChallenges = getChallenges;
const getChallenge = (state = {}, key) => {
    const registry = getRegistry(state);
    if (!registry) {
        return undefined;
    }
    if (!registry.challenges) {
        return undefined;
    }
    return registry.challenges[key];
};
exports.getChallenge = getChallenge;
