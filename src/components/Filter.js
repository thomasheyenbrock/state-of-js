import Downshift from "downshift";
import React from "react";
import {
  FaHome,
  FaQuestion,
  FaArrowDown,
  FaPercent,
  FaProjectDiagram
} from "react-icons/fa";
import styled from "styled-components";

import processedData from "../data/processedData.json";

const LeftSwitch = styled.div`
  position: absolute;
  bottom: 32px;
  width: 30%;
  left: 5%;
  display: flex;
  flex-direction: row;

  transition: all 1s;
  will-change: transition;
`;

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 32px;
  left: ${props => (props.index === props.focus ? 40 : -60)}%;
  width: 55%;

  display: flex;
  flex-direction: row;

  transition: all 0.5s ease-in-out;
  will-change: transition;
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.white};
  width: 100%;
  outline: ${props => (props.isActive ? 4 : 0)}px solid
    ${props => props.theme.colors.blue};
  outline-offset: -2px;
  padding: 8px 16px;
  z-index: ${props => (props.isActive ? 1 : 0)};
  cursor: pointer;
`;

const buttonGroups = [
  { IconComponent: FaQuestion },
  { IconComponent: FaArrowDown },
  { IconComponent: FaPercent },
  { IconComponent: FaProjectDiagram }
];

const views = [
  { key: "initial", name: "Select a question..." },
  ...processedData.questions,
  ...processedData.pros.map(({ key, question }) => ({ key, name: question })),
  ...processedData.cons.map(({ key, question }) => ({ key, name: question }))
];

const metrics = [
  { key: "none", name: "Select a metric..." },
  ...processedData.metrics
];

const Filter = ({
  metric,
  setMetric,
  numbers,
  setNumbers,
  setSortBy,
  setView,
  sortBy,
  view
}) => {
  const [focus, setFocus] = React.useState(0);
  return (
    <>
      <LeftSwitch isFocused={false}>
        <Button
          onClick={() => {
            setView("initial");
            setMetric("none");
          }}
          style={{ marginRight: "2%" }}
        >
          <FaHome />
        </Button>
        {buttonGroups.map(({ IconComponent }, index) => (
          <Button
            key={IconComponent}
            onClick={() => setFocus(index)}
            isActive={focus === index}
          >
            <IconComponent />
          </Button>
        ))}
      </LeftSwitch>
      <ButtonGroup
        index={0}
        focus={focus}
        style={{ maxHeight: "80%", overflowY: "auto" }}
      >
        <Downshift
          itemToString={item => (item ? item.name : "")}
          selectedItem={views.find(v => v.key === view)}
        >
          {({ getItemProps, getToggleButtonProps, isOpen, selectedItem }) => (
            <div style={{ width: "100%" }}>
              {isOpen &&
                views.map(
                  (v, index) =>
                    !(selectedItem && v.key === selectedItem.key) && (
                      <Button
                        {...getItemProps({
                          key: v.key,
                          index,
                          item: v,
                          onClick: () => setView(v.key)
                        })}
                      >
                        {v.name}
                      </Button>
                    )
                )}
              <Button {...getToggleButtonProps()}>
                {selectedItem ? selectedItem.name : "Select a question..."}
              </Button>
            </div>
          )}
        </Downshift>
      </ButtonGroup>
      <ButtonGroup index={1} focus={focus}>
        <Button
          isActive={sortBy === "category"}
          onClick={() => setSortBy("category")}
        >
          Sort by category
        </Button>
        <Button
          isActive={sortBy === "magnitude"}
          onClick={() => setSortBy("magnitude")}
        >
          Sort by magnitude
        </Button>
      </ButtonGroup>
      <ButtonGroup focus={focus} index={2}>
        <Button
          isActive={numbers === "counts"}
          onClick={() => setNumbers("counts")}
        >
          Counts
        </Button>
        <Button
          isActive={numbers === "percents"}
          onClick={() => setNumbers("percents")}
        >
          Percents
        </Button>
      </ButtonGroup>
      <ButtonGroup focus={focus} index={3}>
        <Downshift
          itemToString={item => (item ? item.name : "")}
          selectedItem={metrics.find(m => m.key === metric)}
        >
          {({ getItemProps, getToggleButtonProps, isOpen, selectedItem }) => (
            <div style={{ width: "100%" }}>
              {isOpen &&
                metrics.map(
                  (m, index) =>
                    !(selectedItem && m.key === selectedItem.key) && (
                      <Button
                        {...getItemProps({
                          key: m.key,
                          index,
                          item: m,
                          onClick: () => setMetric(m.key)
                        })}
                      >
                        {m.name}
                      </Button>
                    )
                )}
              <Button {...getToggleButtonProps()}>
                {selectedItem ? selectedItem.name : "Select a metric..."}
              </Button>
            </div>
          )}
        </Downshift>
      </ButtonGroup>
    </>
  );
};

export default Filter;
