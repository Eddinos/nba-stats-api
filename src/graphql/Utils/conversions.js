const poundsToKg = weightPounds => (weightPounds * 0.453592);

const feetToMeters = (heightFeet, heightInches) => ((heightFeet * 30.48 + heightInches * 2.54) / 100);

export {poundsToKg, feetToMeters}
