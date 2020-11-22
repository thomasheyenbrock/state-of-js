import PropTypes from "prop-types";
import React from "react";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  z-index: ${(props) => (props.visible ? 2 : 0)};

  transition: all 1s;
  will-change: transition;
`;

const Dialog = styled.div`
  position: absolute;
  height: 90%;
  width: 80%;
  top: 5%;
  left: 10%;
  border: 2px solid ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.black};
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

const Emphasise = styled.span`
  color: ${(props) => props.theme.colors.red};
`;

const Overlay = (props) => {
  const positiveFlavors = joinTextFragments(props.story.flavorUsers);
  const negativeFlavors = joinTextFragments(props.story.flavorAvoiders, "or");
  return (
    <Background visible={props.overlay} onClick={() => props.setOverlay(false)}>
      <Dialog visible={props.overlay} onClick={(e) => e.stopPropagation()} />
      <Text onClick={(e) => e.stopPropagation()}>
        <h2>A story about the typical {props.name}-user...</h2>
        {typeof stars === "number" ? (
          <p>
            The user is probably one of the {props.stars} stargazers of the
            GitHub repository of {props.name}! (This rounds down to{" "}
            {Math.floor(props.stars / 1000)} thousand stars. 😉)
          </p>
        ) : null}
        {props.category.name !== "java_script_flavors" && (
          <p>
            {positiveFlavors ? (
              <>
                When it comes to JavaScript flavors, {props.name}-users like to
                use <Emphasise>{positiveFlavors}</Emphasise>.{" "}
              </>
            ) : (
              `${props.name}-users don't like any particular flavors of the JavaScript language. `
            )}
            {negativeFlavors ? (
              <>
                They don&apos;t appreciate{" "}
                <Emphasise>{negativeFlavors}</Emphasise> though.
              </>
            ) : (
              "There are no flavors that they dislike."
            )}
          </p>
        )}
        {props.category.name !== "front_end" && (
          <p>
            For building frontend applications, {props.name}-users prefer{" "}
            <Emphasise>{props.story.front_end}</Emphasise>.
          </p>
        )}
        <p>
          Fo compiling and building his frontend code the {props.name}-user
          leverages <Emphasise>{props.story.buildTool}</Emphasise>.
        </p>
        {props.category.name !== "data_layer" && (
          <p>
            {props.name}-users mostly rely on{" "}
            <Emphasise>{props.story.data_layer}</Emphasise> for managing their
            data layer.
          </p>
        )}
        {props.category.name !== "back_end" && (
          <p>
            The most common backend framework that {props.name}-users like to
            use is <Emphasise>{props.story.back_end}</Emphasise>.
          </p>
        )}
        {props.category.name !== "testing" && (
          <p>
            When it comes to testing their code, {props.name}-users like{" "}
            <Emphasise>{props.story.testing}</Emphasise> the most.
          </p>
        )}
        {props.category.name !== "mobile_desktop" && (
          <p>
            If the {props.name}-user wants to build something for mobile devices
            or some desktop application he sticks with{" "}
            <Emphasise>{props.story.mobile_desktop}</Emphasise>.
          </p>
        )}
        {props.story.utilityLibraries.length === 0 ? (
          <>
            Users of {props.name} normally don&apos;t need further utility
            libraries.
          </>
        ) : (
          <>
            Users of {props.name} also like to use some utility libraries like{" "}
            <Emphasise>
              {joinTextFragments(props.story.utilityLibraries)}
            </Emphasise>
            .
          </>
        )}
        <p>
          <Emphasise>{props.story.textEditor}</Emphasise> is the favourite text
          editor in which {props.name}-users like to code.
        </p>
      </Text>
      <CloseIcon />
    </Background>
  );
};

Overlay.propTypes = {
  category: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  name: PropTypes.string.isRequired,
  overlay: PropTypes.bool.isRequired,
  setOverlay: PropTypes.func.isRequired,
  stars: PropTypes.number.isRequired,
  story: PropTypes.shape({
    back_end: PropTypes.string,
    buildTool: PropTypes.string,
    data_layer: PropTypes.string,
    flavorAvoiders: PropTypes.arrayOf(PropTypes.string),
    flavorUsers: PropTypes.arrayOf(PropTypes.string),
    front_end: PropTypes.string,
    mobile_desktop: PropTypes.string,
    testing: PropTypes.string,
    textEditor: PropTypes.string,
    utilityLibraries: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Overlay;
