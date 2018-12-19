import PropTypes from "prop-types";
import React from "react";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: ${props => (props.visible ? 1 : 0)};
  z-index: ${props => (props.visible ? 2 : 0)};

  transition: all 1s;
  will-change: transition;
`;

const Dialog = styled.div`
  position: absolute;
  height: 90%;
  width: 80%;
  top: 5%;
  left: 10%;
  border: 2px solid ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.black};
  padding: 5%;
`;

const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 10%;
  right: 15%;
  padding: 8px;
  height: 34px;
  width: 34px;
  cursor: pointer;
`;

const Text = styled.span`
  position: absolute;
  top: 5%;
  left: 10%;
  width: 80%;
  height: 90%;
  padding: 5%;
  overflow-y: auto;
`;

const joinTextFragments = (textFragments, joinWith = "and") => {
  if (textFragments.length === 0) return "";
  if (textFragments.length === 1) return textFragments[0];

  const [lastElement, ...restElements] = textFragments.reverse();
  return `${restElements.reverse().join(", ")} ${joinWith} ${lastElement}`;
};

const Overlay = props => {
  const { category, name, overlay, setOverlay, story } = props;
  const positiveFlavors = joinTextFragments(story.flavorUsers);
  const negativeFlavors = joinTextFragments(story.flavorAvoiders, "or");
  return (
    <Background visible={overlay} onClick={() => setOverlay(false)}>
      <Dialog visible={overlay} onClick={e => e.stopPropagation()} />
      <Text onClick={e => e.stopPropagation()}>
        <h3>A story about the typical {name}-user...</h3>
        {category.name !== "java_script_flavors" && (
          <p>
            {positiveFlavors
              ? `When it comes to JavaScript flavors, ${name}-users like to use ${positiveFlavors}. `
              : `${name}-users don't like any particular flavors of the JavaScript language. `}
            {negativeFlavors
              ? `They doesn't appreciate ${negativeFlavors} though.`
              : "There are no flavors that they dislike."}
          </p>
        )}
      </Text>
      <CloseIcon />
    </Background>
  );
};

Overlay.propTypes = {
  category: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  name: PropTypes.string.isRequired,
  overlay: PropTypes.bool.isRequired,
  setOverlay: PropTypes.func.isRequired,
  story: PropTypes.shape({
    flavors: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default Overlay;
