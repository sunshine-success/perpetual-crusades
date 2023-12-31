import React, { Component, Fragment } from "react";
import PlayersDisplay from "../components/PlayersDisplay";
import { 
  AncientWizard, 
  BanefulBlueDragon,
  FieryRedDragon,
  MightyKnight,
  NoxiousGreenDragon,
  StealthyRogue
} from "../assets";

const characterComponents = {
  "Baneful Blue Dragon": BanefulBlueDragon,
  "Fiery Red Dragon": FieryRedDragon,
  "Noxious Green Dragon": NoxiousGreenDragon,
  "Ancient Wizard": AncientWizard,
  "Mighty Knight": MightyKnight,
  "Stealthy Rogue": StealthyRogue,
};

class CharacterSelection extends Component {
  state = {
    characters: {
      Dragon: [
        "Baneful Blue Dragon",
        "Fiery Red Dragon",
        "Noxious Green Dragon" 
      ],
      Humanoid: ["Ancient Wizard", "Mighty Knight", "Stealthy Rogue"],
    },
    currentPlayerNumber: 1,
    players: [],
    readyToStart: false,
  };

  setPlayer = (character) => {
    this.setState((prevState) => ({
      currentPlayerNumber: prevState.currentPlayerNumber + 1,
      players: [
        ...prevState.players,
        { number: prevState.currentPlayerNumber, character },
      ],
      readyToStart: prevState.currentPlayerNumber === 2 ? true : false,
    }));
  };

  getPlayerRace = (currentPlayerNumber) =>
    currentPlayerNumber === 1 ? "Humanoid" : "Dragon";

  startGame = () => {
    this.props.startGame(this.state.players);
  };

  render() {
    return (
      <div>
        <PlayersDisplay
          players={this.state.players}
          getPlayerRace={this.getPlayerRace}
          onIntroScreen={true}
        />
        {this.state.readyToStart ? (
          <Fragment>
            <button onClick={this.startGame} className="button">
              Start Game
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <h1 style={{ textAlign: "center" }}>
              {this.getPlayerRace(this.state.currentPlayerNumber)} race, choose
              your hero:
            </h1>
            {this.state.characters[
              this.getPlayerRace(this.state.currentPlayerNumber)
            ].map((character) => {
              const CharacterComponent = characterComponents[character];
              return (<button
                className="character"
                onClick={() => this.setPlayer(character)}
                style={{ textDecoration: "none" }}
                key={character}
                >
                <img
                  className="character-image"
                  src={CharacterComponent}
                  alt={character}
                  />
                <div style={{ textAlign: "center" }}>{character}</div>
              </button>
            )
          }
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default CharacterSelection;
