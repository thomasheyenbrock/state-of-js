import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Overlay from "./Overlay";
import processedData from "../data/processedData.json";

const {
  minimumsForMetrics,
  maximumsForMetrics,
  maximumsForQuestions
} = processedData;

const getHeightByNumbers = props =>
  props.numbers === "counts"
    ? props.values[props.view].counts / maximumsForQuestions[props.view].counts
    : props.values[props.view].percents /
      maximumsForQuestions[props.view].percents;

const getHeight = props => {
  if (props.view === "initial") {
    return 96;
  }
  if (props.type === "box") {
    if (props.metric === "none") {
      return 4 * 96 * getHeightByNumbers(props);
    }
    return 8;
  }
  return 20;
};

const getWidth = ({ metric, type, view }) => {
  if (view === "initial") {
    return 96;
  }
  if (metric === "none") {
    return 24;
  }
  if (type === "content") {
    return 0;
  }
  return 8;
};

const getMarginTop = props => {
  if (props.view === "initial") {
    return 0;
  }
  return 4 * 96 * (1 - getHeightByNumbers(props));
};

const getSortIndex = ({ numbers, sort, sortBy, view }) =>
  sort[sortBy === "category" ? "category" : view][numbers] - 1;

const getTop = ({ numbers, row, sort, sortBy, type, view }) => {
  if (view === "initial") {
    return `calc(32px + ${row - 1} * 96px)`;
  }
  if (type === "box") {
    return "96px";
  }
  return `calc(4 * 96px + 96px + ${
    getSortIndex({ numbers, sort, sortBy, view }) % 2 === 0 ? "20px" : "0px"
  })`;
};

const getLeft = ({ column, metric, metrics, numbers, sort, sortBy, view }) => {
  if (view === "initial") {
    return `calc((100% - 9 * 96px) / 2 + ${column - 1} * 96px)`;
  }
  if (metric === "none") {
    return `calc((100% - 9 * 96px) / 2 + ${getSortIndex({
      numbers,
      sort,
      sortBy,
      view
    })} * 24px)`;
  }
  return `calc((100% - 9 * 96px) / 2 + ${(metrics[metric] -
    minimumsForMetrics[metric] +
    0.025) /
    (maximumsForMetrics[metric] -
      minimumsForMetrics[metric] +
      0.05)} * 9 * 96px - 4px)`;
};

const HoverBox = css`
  &:hover {
    &::after {
      content: "${props => props.name.replace(/ /g, "")}";
      border: 1px solid ${props => props.theme.colors.white};
      background-color: ${props => props.theme.colors.black};
      position: absolute;
      top: 24px;
      z-index: 1;
      font-weight: 300;
      color: ${props => props.theme.colors.white};
      font-size: 12px;
      padding: 8px;
      width: max-content;
    }
  }
`;

const Box = styled.a`
  outline: 2px solid white;
  outline-offset: -1px;

  height: ${props => getHeight({ ...props, type: "box" })}px;
  width: ${props => getWidth({ ...props, type: "box" })}px;

  margin-top: ${getMarginTop}px;

  position: absolute;
  top: ${props => getTop({ ...props, type: "box" })};
  left: ${props => getLeft({ ...props, type: "box" })};

  background-color: ${props =>
    props.view === "initial" ? "transparent" : props.category.color};

  transition: all 1s;
  transition-delay: ${props => props.sort.category.counts / 50}s;
  will-change: transition;

  ${props => (props.view === "initial" ? "" : HoverBox)}

  z-index: 1;
`;

const Content = styled.div`
  height: ${props => getHeight({ ...props, type: "content" })}px;
  width: ${props => getWidth({ ...props, type: "content" })}px;

  position: absolute;
  top: ${props => getTop({ ...props, type: "content" })};
  left: ${props => getLeft({ ...props, type: "content" })};

  opacity: ${props =>
    props.metric === "none" || props.view === "initial" ? 1 : 0};

  transition: all 1s;
  transition-delay: ${props => props.sort.category.counts / 50}s;
  will-change: transition;
`;

const Number = styled.div`
  font-size: 1em;
  padding: ${props =>
    props.metric === "none" || props.view === "initial" ? "8px 8px 0" : 0};

  position: absolute;

  width: ${props =>
    props.metric === "none" || props.view === "initial" ? 96 : 0}px;
  top: ${props =>
    props.view === "initial"
      ? 0
      : (getSortIndex(props) % 2 === 0 ? -20 : 0) -
        16 -
        getHeightByNumbers(props) * 4 * 96}px;
  left: ${props => (props.view === "initial" ? 0 : 8)}px;

  transform: rotate(-${props => (props.view === "initial" ? 0 : 90)}deg);
  transform-origin: left;
  animation-delay: ${props => props.sort.category / 50}s;

  transition: all 1s;
  transition-delay: ${props => props.sort.category.counts / 50}s;
  will-change: transition;
`;

const ShortName = styled.div`
  color: ${props => props.theme.colors[props.category.color]};
  font-size: ${props => (props.view === "initial" ? 1.6 : 1.2)}em;
  word-break: keep-all;
  font-weight: 600;
  text-align: center;

  position: absolute;
  width: 100%;
  top: ${props => (props.view === "initial" ? 29 : 9)}px;

  transition: all 1s;
  transition-delay: ${props => props.sort.category.counts / 50}s;
  will-change: transition;

  ${props => (props.view === "initial" ? "" : HoverBox)}
`;

const Name = styled.div`
  color: ${props => props.theme.colors[props.category.color]};
  font-size: 0.6em;
  padding: ${props => (props.view === "initial" ? "8px" : 0)} 2px;
  text-align: center;
  max-height: ${props => (props.view === "initial" ? "28px" : 0)};
  opacity: ${props => (props.view === "initial" ? 1 : 0)};

  position: absolute;
  width: 100%;
  top: 67px;

  transition: all 1s;
  transition-delay: ${props => props.sort.category.counts / 50}s;
  will-change: transition;
`;

const Element = props => {
  let number;
  if (typeof props.stars === "number") {
    number = Math.floor(props.stars / 1000) || 0;
  }
  if (props.view !== "initial") {
    number = props.values[props.view][props.numbers];
    if (props.numbers === "percents") {
      number = Math.round(number * 10000) / 100;
    }
  }

  const [overlay, setOverlay] = React.useState(false);

  return (
    <>
      <Box {...props} href="#" onClick={() => setOverlay(true)} />
      <Content {...props}>
        <Number {...props}>
          {number}
          {props.numbers === "percents" && props.view !== "initial" && "%"}
        </Number>
        <ShortName {...props}>{props.shortName}</ShortName>
        <Name {...props}>{props.name}</Name>
      </Content>
      <Overlay {...props} overlay={overlay} setOverlay={setOverlay} />
    </>
  );
};

Element.propTypes = {
  category: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  column: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  numbers: PropTypes.oneOf(["counts", "percents"]).isRequired,
  row: PropTypes.number.isRequired,
  shortName: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired
};

export default Element;
