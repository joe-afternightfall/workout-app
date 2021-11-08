import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../../configs/redux/store';
import { connect } from 'react-redux';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      margin: 'auto',
    },
  })
);

const ExerciseImage = ({
  imageUrl,
  folder,
}: ExerciseImageProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  return <img alt={folder} className={classes.root} src={imageUrl} />;
};

interface PassedInProps {
  folder: string;
  image: string;
}

interface ExerciseImageProps {
  imageUrl: string;
}

const mapStateToProps = (
  state: State,
  ownProps: PassedInProps
): ExerciseImageProps => {
  let imageUrl = '';
  const foundImages = state.workoutState.exerciseImages.find(
    (images) => images.name === ownProps.folder
  );

  if (foundImages) {
    const foundUrl = foundImages.downloadUrls.find((url) =>
      url.includes(ownProps.image)
    );
    if (foundUrl) {
      imageUrl = foundUrl;
    }
  }
  return {
    imageUrl: imageUrl,
  } as unknown as ExerciseImageProps;
};

export default connect(mapStateToProps)(ExerciseImage);
