const {describe, it} = require("mocha");
const assert = require("assert");
const boosterGenerator = require("./boosterGenerator");
const {range} = require("lodash");

range(10000).map((_, idx) => {
  describe("Acceptance tests for boosterGenerator function", () => {
    let boosterPack;

    before(function () {
      boosterPack = boosterGenerator(["SOR", "SHD", "TWI", "JTL", "LOF"][idx%5], true);
    });

    context("whith the generated boosterPack", function () {
      it("should have at least one of each aspect common card", function () {
        const commonAspects = boosterPack.filter(card => card.rarity === 1 && card.type !== "Leader" && !card.foil).reduce((acc, current) => {
          if (acc[current.aspects[0]] >= 0) {
            acc[current.aspects[0]]++;
          }

          return acc;
        }, {
          Vigilance : 0,
          Command: 0 ,
          Aggression: 0,
          Cunning: 0
        });
        try {

          assert(commonAspects.Vigilance > 0);
          assert(commonAspects.Command > 0);
          assert(commonAspects.Aggression > 0);
          assert(commonAspects.Cunning > 0);
        } catch (error) {
          console.error("FAILED TEST");
          console.log(commonAspects);
          console.log(boosterPack);
          console.log("==================");
          throw error;
        }
      });

      it("should have at most 3 of each aspect common card", function () {
        const commonAspects = boosterPack.filter(card => card.rarity === 1 && card.type !== "Leader" && !card.foil).reduce((acc, current) => {
          if (acc[current.aspects[0]] >= 0) {
            acc[current.aspects[0]]++;
          }

          return acc;
        }, {
          Vigilance : 0,
          Command: 0 ,
          Aggression: 0,
          Cunning: 0
        });

        try {
          assert(commonAspects.Vigilance <= 3);
          assert(commonAspects.Command <= 3);
          assert(commonAspects.Aggression <= 3);
          assert(commonAspects.Cunning <= 3);
        } catch (error) {
          console.error("FAILED TEST");
          console.log(commonAspects);
          console.log(boosterPack);
          console.log("==================");
          throw error;
        }
      });

      it("should have at most 2 of each aspect uncommon card", function () {
        const uncommonAspects = boosterPack.filter(card => card.rarity === 2 && card.type !== "Leader" && !card.foil).reduce((acc, current) => {
          if (acc[current.aspects[0]] >= 0) {
            acc[current.aspects[0]]++;
          }

          return acc;
        }, {
          Vigilance : 0,
          Command: 0 ,
          Aggression: 0,
          Cunning: 0
        });

        try {
          assert(uncommonAspects.Vigilance <= 2);
          assert(uncommonAspects.Command <= 2);
          assert(uncommonAspects.Aggression <= 2);
          assert(uncommonAspects.Cunning <= 2);
        } catch (error) {
          console.error("FAILED TEST");
          console.log(uncommonAspects);
          console.log(boosterPack);
          console.log("==================");
          throw error;
        }
      });

      it("should have at least a rare or a legendary", function () {
        try {
          assert(boosterPack.filter(card => (card.rarity === 3 || card.rarity === 4) && card.type !== "Leader" && !card.foil).length >=1);
          assert(boosterPack.filter(card => (card.rarity === 3 || card.rarity === 4) && card.type !== "Leader" && !card.foil).length <=2);
        } catch (error) {
          console.error("FAILED TEST");
          console.log(boosterPack);
          console.log("==================");
          throw error;
        }
      });

      it("should have 2 rares without foil if only 2 uncommon", function () {
        try {
          if (boosterPack.filter(card => (card.rarity === 2 ) && card.type !== "Leader" && !card.foil) === 2) {
            assert(boosterPack.filter(card => (card.rarity === 3) && card.type !== "Leader" && !card.foil).length === 2);
          }
        } catch (error) {
          console.error("FAILED TEST");
          console.log(boosterPack);
          console.log("==================");
          throw error;
        }
      });

      it("should have at least a foil card", function () {
        try {
          assert(boosterPack.filter(card => card.type !== "Leader" && card.foil).length ===1);
        } catch (error) {
          console.error("FAILED TEST");
          console.log(boosterPack);
          console.log("==================");
          throw error;
        }
      });

      it("should have at non S leader", function () {
        try {
          assert(boosterPack.filter(card => card.type === "Leader" && card.rarity !== 5).length ===1);
        } catch (error) {
          console.error("FAILED TEST");
          console.log(boosterPack);
          console.log("==================");
          throw error;
        }
      });
    });
  });
});
