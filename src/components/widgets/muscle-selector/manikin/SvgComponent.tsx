import clsx from 'clsx';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  toggleMuscleGroup,
  applyHoverStylesToMuscleGroup,
  clearHoverStylesForMuscleGroup,
} from '../../../../creators/muscle-selector';
import { State } from '../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    baseStyles: {
      opacity: 0.2,
      transition: 'opacity 0.25s ease-in-out',
      '&:hover': {
        cursor: 'pointer',
        opacity: 0.5,
        fill: '#00bcd4',
      },
    },
    selected: {
      opacity: 0.8,
      fill: '#00bcd4',
    },
    hovering: {
      opacity: 0.75,
    },
  })
);

const SvgComponent = (
  props: SvgComponentProps & PassedInSvgComponentProps
): JSX.Element => {
  const classes = useStyles();
  const checkboxInputId = `${props.muscleName}-checkbox`;

  const handleClick = () => {
    const checkbox = document.getElementById(
      checkboxInputId
    ) as HTMLInputElement;
    checkbox.checked ? (checkbox.checked = false) : (checkbox.checked = true);
    props.selectHandler(checkboxInputId);
  };

  const checkSelectedIds = (): boolean => {
    const foundIndex = props.selectedMuscleGroupIds.indexOf(checkboxInputId);
    return foundIndex !== -1;
  };

  const checkForHover = (): boolean => {
    return props.hoveringOverGroup === checkboxInputId;
  };

  const handleMouseOver = () => {
    props.mouseOverHandler(checkboxInputId);
  };

  const handleMouseOut = () => {
    props.mouseOutHandler();
  };

  return (
    <g
      id={`${props.muscleName}-svg`}
      onClick={() => {
        handleClick();
      }}
      className={clsx(classes.baseStyles, {
        [classes.selected]: checkSelectedIds(),
        [classes.hovering]: checkForHover(),
      })}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {props.paths.map((path: string, index: number) => {
        return (
          <path
            key={index}
            d={path}
            style={{ fill: checkSelectedIds() ? '' : props.fill }}
          />
        );
      })}
    </g>
  );
};

export interface SvgComponentProps {
  hoveringOverGroup: string;
  selectedMuscleGroupIds: string[];
  selectHandler: (muscleGroupCheckboxId: string) => void;
  mouseOverHandler: (muscleGroupId: string) => void;
  mouseOutHandler: () => void;
}

export interface PassedInSvgComponentProps {
  paths: string[];
  muscleName: string;
  fill: string;
}

const mapStateToProps = (state: State): SvgComponentProps => {
  return {
    hoveringOverGroup: state.applicationState.applyHoverStylesToMuscleGroup,
    selectedMuscleGroupIds: state.applicationState.selectedMuscleGroupIds,
  } as unknown as SvgComponentProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SvgComponentProps =>
  ({
    selectHandler: (muscleGroupId: string) => {
      dispatch(toggleMuscleGroup(muscleGroupId));
    },
    mouseOverHandler: (muscleGroupId: string) => {
      dispatch(applyHoverStylesToMuscleGroup(muscleGroupId));
    },
    mouseOutHandler: () => {
      dispatch(clearHoverStylesForMuscleGroup());
    },
  } as unknown as SvgComponentProps);

export default connect(mapStateToProps, mapDispatchToProps)(SvgComponent);
