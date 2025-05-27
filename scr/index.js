const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};
const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};
const player3 = {
  NOME: "Yoshi",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 4,
  PODER: 3,
  PONTOS: 0,
};
const player4 = {
  NOME: "Peach",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 2,
  PONTOS: 0,
};
const player5 = {
  NOME: "Bowser",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};
const player6 = {
  NOME: "Donkey Kong",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};

async function rolldice() {
  return Math.floor(Math.random() * 6) + 1;
}
async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "Reta";
      break;
    case random < 0.66:
      result = "Curva";
      break;
    default:
      result = "Confrontro";
  }
  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `🏁🚨 ${characterName} rolou um dado de ${block} e ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }   `
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🚨🏁 Rodada ${round} 🚨 `);

    let block = await getRandomBlock();
    console.log(`🚨🏁 Bloco: ${block} 🚨 `);

    let diceResult1 = await rolldice();
    let diceResult2 = await rolldice();

    let TotalTestSkill1 = 0;
    let TotalTestSkill2 = 0;

    if (block == "Reta") {
      TotalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      TotalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );
      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }
    if (block == "Curva") {
      TotalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      TotalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
      await logRollResult(
        character1.NOME,
        "manabrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );
      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }
    if (block == "Confrontro") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou ${character2.NOME}`);
      console.log("___________________");

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );
      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(
          `${character1.NOME} venceu o confroto! ${character2.NOME} perdeu um ponto`
        );
        character2.PONTOS--;
      }
      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(
          `${character2.NOME} venceu o confroto! ${character1.NOME} perdeu um ponto`
        );
        character1.PONTOS--;
      }

      console.log(
        powerResult2 === powerResult1 ? "Empate! Ninguém marcou ponto!!" : ""
      );
    }

    if (TotalTestSkill1 > TotalTestSkill2) {
      console.log(`🏁🚨 ${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (TotalTestSkill2 > TotalTestSkill1) {
      console.log(`🏁🚨 ${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log("_______________________________");
  }
  console.log("🏁 Corrida finalizada!");
  console.log(`${character1.NOME} fez ${character1.PONTOS} pontos.`);
  console.log(`${character2.NOME} fez ${character2.PONTOS} pontos.`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`🏆 ${character1.NOME} venceu a corrida!`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`🏆 ${character2.NOME} venceu a corrida!`);
  } else {
    console.log("⚔️ Empate! Nenhum vencedor desta vez.");
  }
}
(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começou...🚨🏁 `
  );

  await playRaceEngine(player1, player2);
})();
