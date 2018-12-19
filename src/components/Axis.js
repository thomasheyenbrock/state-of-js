import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import processedData from "../data/processedData.json";

const {
  cons,
  maximumsForMetrics,
  metrics,
  minimumsForMetrics,
  maximumsForQuestions,
  pros,
  questions
} = processedData;

const Wrapper = styled.div`
  opacity: ${props =>
    props.metric !== "none" && props.view !== "initial" ? 1 : 0};
  transition: all 1s;
  will-change: transition;
`;

const XAxis = styled.div`
  position: absolute;
  left: calc((100% - 9 * 96px) / 2);
  top: 96px;
  height: calc(4 * 96px);
  width: calc(9 * 96px);
  border-bottom: 2px solid ${props => props.theme.colors.white};
  z-index: -1;
`;

const YAxis = styled(XAxis)`
  border-bottom: 0;
  border-left: 2px solid ${props => props.theme.colors.white};
`;

const XAxisMark = styled.div`
  position: absolute;
  left: calc(
    (100% - 9 * 96px) / 2 + (9 * 96px - 4px) * ${props => props.index} / 4
  );
  top: 480px;
  height: 6px;
  width: 0;
  border: 2px solid ${props => props.theme.colors.white};
`;

const XAxisNumber = styled.span`
  position: absolute;
  width: 48px;
  text-align: center;
  top: 488px;
  left: calc(
    (100% - 9 * 96px) / 2 + (9 * 96px - 4px) * ${props => props.index} / 4 -
      22px
  );
`;

const XAxisDescription = styled.span`
  position: absolute;
  transform: rotate(-90deg);
  transform-origin: left;
  left: calc((100% - 9 * 96px) / 2 - 100px);
  text-align: center;
  width: calc(4 * 96px);
  top: 460px;
`;

const YAxisMark = styled.div`
  position: absolute;
  left: calc((100% - 9 * 96px) / 2 - 6px);
  top: calc(476px - (4 * 96px - 4px) * ${props => props.index} / 4);
  width: 6px;
  border: 2px solid ${props => props.theme.colors.white};
`;

const YAxisNumber = styled.span`
  position: absolute;
  left: calc((100% - 9 * 96px) / 2 - 80px);
  top: calc(476px - (4 * 96px - 4px) * ${props => props.index} / 4 - 8px);
  width: 72px;
  text-align: right;
`;

const YAxisDescription = styled.span`
  position: absolute;
  left: calc((100% - 9 * 96px) / 2);
  top: 520px;
  width: calc(9 * 96px);
  text-align: center;
`;

const indexArray = [0, 1, 2, 3, 4];

const Axis = ({ metric, numbers, view }) => {
  const metricObject = metrics.find(m => m.key === metric);
  const viewObject = [...questions, ...pros, ...cons].find(q => q.key === view);
  return (
    <Wrapper metric={metric} view={view}>
      <XAxis />
      <XAxisDescription>
        {viewObject ? viewObject.question || viewObject.name : ""}
      </XAxisDescription>
      {indexArray.map(index => (
        <XAxisMark key={index} index={index} />
      ))}
      {indexArray.map(index => {
        let number = "";
        if (metric !== "none") {
          number =
            (index *
              (maximumsForMetrics[metric] -
                minimumsForMetrics[metric] +
                0.05)) /
              4 +
            minimumsForMetrics[metric] -
            0.025;
          number = Math.round(number * 100) / 100;
        }
        return (
          <XAxisNumber key={index} index={index}>
            {number}
          </XAxisNumber>
        );
      })}
      <YAxis />
      <YAxisDescription>
        {metricObject ? metricObject.name : ""}
      </YAxisDescription>
      {indexArray.map(index => (
        <YAxisMark key={index} index={index} />
      ))}
      {indexArray.map(index => {
        let number = "";
        if (view !== "initial") {
          number = (index * maximumsForQuestions[view][numbers]) / 4;
        }
        if (numbers === "percents") {
          number = `${(Math.round(number * 10000) / 100).toString()}%`;
        } else {
          number = Math.round(number);
        }
        return (
          <YAxisNumber key={index} index={index}>
            {number}
          </YAxisNumber>
        );
      })}
    </Wrapper>
  );
};

Axis.propTypes = {
  metric: PropTypes.string.isRequired,
  numbers: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired
};

export default Axis;
