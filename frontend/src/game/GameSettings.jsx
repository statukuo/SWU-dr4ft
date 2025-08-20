import React from "react";

import App from "../app";
import Checkbox from "../components/Checkbox";
import "./GameSettings.scss";

const GameSettings = () => (
  <div className='GameSettings'>
    <fieldset className='fieldset'>
      <legend className='legend game-legend'>Settings</legend>
      <span>
        <Checkbox side="left" text="Show chat" link="chat" />
        {!App.state.isSealed &&
          <Checkbox side="left" text="Enable notifications on new packs" link="beep" />
        }
        {!App.state.isSealed &&
          <div style={{paddingLeft: "10px"}} >
            <Checkbox side="left"
              text={App.state.notificationBlocked ? "Web notifications blocked in browser" : "Use desktop notifications over beep"}
              link="notify"
              disabled={!App.state.beep || App.state.notificationBlocked}
              onChange={App._emit("notification")} />
          </div>
        }
        {!App.state.isSealed &&
          <Checkbox side="left" text="Add picks to sideboard" link="side" />}
        {!App.state.isSealed &&
          <Checkbox side="left" text="Hide your picks" link="hidepicks" />
        }
        {!App.state.isSealed &&
          <Checkbox side="left" text="Hide your bases" link="hidebases" />
        }
        <SortCards />
        {App.state.sort === "aspect" &&
          <PriorityAspects />
        }
      </span>
    </fieldset>
  </div>
);

const SortCards = () => (
  <div className="sort-cards">
    Sort cards by:
    <div className='connected-container' >
      {["Rarity", "Cost", "Aspect"].map((sort, index) => {
        const isActive = sort.toLowerCase() === App.state.sort;

        return (
          <label key={index}
            className={isActive
              ? "active connected-component"
              : "connected-component"
            }
          >
            <input checked= {isActive}
              className='radio-input'
              name= 'sort-order'
              onChange= {e => App.save("sort", e.currentTarget.value)}
              type='radio'
              value={sort.toLowerCase()}
            />
            <div>{sort}</div>
          </label>
        );
      })}
    </div>
  </div>
);

const PriorityAspects = () => (
  <div className="sort-cards">
    What aspects to prioritize:
    <div className='connected-container' >
      {["Vigilance", "Command", "Aggression", "Cunning", "Villainy", "Heroism"].map((aspect, index) => {
        const isActive = App.state.aspectPriority.includes(aspect);

        return (
          <label key={index}
            className={isActive
              ? "active connected-component"
              : "connected-component"
            }
          >
            <img src={`./../media/SWH_Aspects_${aspect}.png`} width="18px" height="18px"/>
            <input checked= {isActive}
              className='radio-input'
              name= 'sort-order'
              onClick= {e => App.addRemoveAspectPriority(e.currentTarget.value)}
              type='radio'
              value={aspect}
            />
            <div>{aspect}</div>
          </label>
        );
      })}
    </div>
  </div>
);

export default GameSettings;
