import { TrainingSetTypeVO } from '../models/configurations/TrainingSetTypeVO';
import { PhaseVO } from '../models/configurations/PhaseVO';
import { ExerciseVO } from '../models/configurations/ExerciseVO';
import { EquipmentVO } from '../models/configurations/EquipmentVO';
import { GripTypeVO } from '../models/configurations/GripTypeVO';
import { ParameterTypeVO } from '../models/configurations/ParameterTypeVO';
import { GripWidthVO } from '../models/configurations/GripWidthVO';
import { WorkoutCategoryVO } from '../models/configurations/WorkoutCategoryVO';
import { RoutineTemplateVO } from '../models/workout/RoutineTemplateVO';

export const trainingSetTypes: TrainingSetTypeVO[] = [
  {
    firebaseId: '752f5ed4-5bb7-4f98-b4df-da02104bf040',
    id: '40ac0220-8032-4860-81dd-68943d786123',
    name: 'Straight Sets',
    description:
      'Performing straight sets is the standard method for arranging your weight training workout. Straight sets require you to perform a number of sets using the same number of repetitions and using the same weight. For example, you may perform three sets of 12 repetitions using 40 pounds for a particular exercise and two sets of six repetitions using 75 pounds for another.',
    iconId: '503bd6e6-02ca-44f3-9f8e-c20ad466419f',
  },
  {
    firebaseId: 'b88dc0f3-0636-4553-ac71-e76a05f70710',
    id: '3fd3c30c-6c6a-4cfd-8e59-5b500e486374',
    name: 'Super Sets',
    description:
      'Pairing exercises is called super setting. You do not rest between pairings, but only on completion of the second exercise within the super set. There are three main types of super sets. In agonist super sets, you pair exercises that work the same muscle group. For example, you can combine lunges with squats or bench presses with push ups. In antagonist super sets, you pair exercises that work opposite muscle groups, as with lat pull downs and shoulder presses or leg extensions and leg curls. In upper body / lower body super sets, you pair an upper body exercise with a lower body exercises. For example, you can combine bench presses with lunges or step ups with biceps curls. All of these types of super sets allow you to perform more work in less time, which makes them very useful if you only have a short time to work out. All super set methods will increase the intensity of your workout by reducing the amount of time you rest.',
    iconId: '',
  },
  {
    firebaseId: '1b538cc7-bec3-462d-b139-2fd02677c122',
    id: '08d72ffa-6856-4bab-ad8a-fc019bdc2809',
    name: 'Tri Sets and Giant Sets',
    description:
      'If you combine three exercises, this is called a tri set. Groupings of four or more exercises are called giant sets. Both tri sets and giant sets will further increase the intensity of your workout.',
    iconId: '',
  },
  {
    firebaseId: '5ccb528a-e3b6-4838-b153-081b38a4426d',
    id: '37ee55d5-3e52-4f36-b829-1874de7f2c0e',
    name: 'Drop Sets',
    description:
      "Drop sets are used by bodybuilders to increase muscle mass and also will increase your muscular endurance. Drop sets allow you to extend your set beyond its normal termination point. Usually, when performing any exercise, you have to stop because your muscles are tired. However, they are only too tired to lift the weight you are using and are not completely exhausted. When performing drop sets, once you have reached muscular failure--the point at which you can't continue lifting the weight--you immediately reduce, or drop, the weight and continue your set using a lighter weight to work your muscles more intensely.\n" +
      '\n' +
      'An example for bicep curls would be performing 10 reps using 35 pounds to failure, then seven reps using 27.5 pounds to failure, finishing with six reps using 20 pounds to failure.',
    iconId: '',
  },
  {
    firebaseId: '3479a8ed-d039-4872-9b51-89954f272a95',
    id: '3fd3c30c-6c6a-4cfd-8e59-5b500e486374',
    name: 'Pyramid Sets',
    description:
      'When you perform pyramid sets, you manipulate the weight used and repetitions performed as you progress through your workout. For example, in set one you do 12 reps with 60 pounds; in set two, you perform 10 reps with 70 pounds; and in set three, you do eight reps with 80 pounds. Pyramid sets allow you to warm up gradually as you increase the intensity of your workout.',
    iconId: '',
  },
];

export const phases: PhaseVO[] = [
  {
    firebaseId: '4d5854a2-b12a-451a-8b26-7d582e2cfd8e',
    id: '5013c328-7cdd-4ae9-bd1a-046d6433a653',
    name: 'Warm Ups',
    description: '',
  },
  {
    firebaseId: '88e402bc-a7cb-4bfb-a049-4e4af86fca20',
    id: 'b8cde8ed-41ba-497a-a62f-219e22d1a733',
    name: 'HIIT',
    description: 'high interval intense training',
  },
  {
    firebaseId: '8f2c2999-3ed4-414d-99d3-586400b63269',
    id: '05978fe8-3cc1-4c97-9ecc-67734e954c51',
    name: 'Strength Training',
    description: '',
  },
  {
    firebaseId: '253681fb-f2c1-4eb5-8522-9ea0971e5702',
    id: '4dfcb01d-89ae-48e8-8ffc-ecceb7b34bf0',
    name: 'Cardio',
    description: '',
  },
  {
    firebaseId: 'c670e08b-7139-4d1d-b49d-53e1a69c28ce',
    id: '06919b6d-40ac-4dc4-91f9-64fd6ff9612c',
    name: 'Interval Training',
    description: '',
  },
];

export const workoutCategories: WorkoutCategoryVO[] = [
  {
    firebaseId: 'c7b03c13-126f-4f9a-afe2-19ecde8a6540',
    id: '7ce750dc-fc73-43ad-99c3-a60a8b846177',
    name: 'Back and Biceps',
    color: '',
    muscleGroupIds: ['5', '6', '1'],
  },
  {
    firebaseId: 'df4876c5-9aaf-4fa3-b635-66414bc521c4',
    id: '70f1b717-792c-4986-ba3d-db65c25c329d',
    name: 'Chest and Triceps',
    color: '',
    muscleGroupIds: ['9', '4'],
  },
  {
    firebaseId: '500c9b74-ee52-4878-af0e-1024211d908a',
    id: '75fff0e4-937f-410b-8080-725b788616c4',
    name: 'Shoulders and Legs',
    color: '',
    muscleGroupIds: ['2', '12', '11'],
  },
];

export const equipmentList: EquipmentVO[] = [
  {
    firebaseId: '82fd7518-5e6a-4cbc-b6f8-bf475492e2e1',
    id: '57fd527b-4127-43af-944f-a44a04edf2c0',
    name: 'Barbell',
    description: '',
    iconId: '',
  },
  {
    firebaseId: '058dd173-1b77-433b-82e1-b80ccac1a04a',
    id: '7d242914-ac92-4aa0-b24e-8f2f6421a4a2',
    name: 'Bench',
    description: '',
    iconId: '',
  },
  {
    firebaseId: '7693dfc6-70c4-4351-85fe-28c94aad5077',
    id: 'f4d03bda-923f-4a09-bd04-1ed1d8d008f4',
    name: 'Dumbbell',
    description: '',
    iconId: '',
  },
  {
    firebaseId: 'ca414531-0a87-40ff-9e72-edfa1eb020a6',
    id: '6a05efa2-b40c-4163-8aba-b495e25bc5b6',
    name: 'Gym mat',
    description: '',
    iconId: '',
  },
  {
    firebaseId: '4233d2bd-e8f9-41f3-ba9e-591f87fb01e8',
    id: '693f3b0d-fc7f-4ecf-8b50-4c5be4b9ca94',
    name: 'Incline bench',
    description: '',
    iconId: '',
  },
  {
    firebaseId: 'b5f95307-2800-4c2b-bff1-a0ba0b6f9562',
    id: 'e395030c-211e-4647-892e-eef98739759f',
    name: 'Kettlebell',
    description: '',
    iconId: '',
  },
  {
    firebaseId: '4eaa8d11-e705-4ec4-86d9-9b9ad63cb7a6',
    id: '1433ea34-1255-4ee1-9e9f-39c948443659',
    name: 'none (bodyweight exercise)',
    description: '',
    iconId: '',
  },
  {
    firebaseId: '50da0265-8e5d-442f-95bb-7713d9f06014',
    id: '9cb02cd6-4d65-47a4-835a-59a046a2df70',
    name: 'Pull-up bar',
    description: '',
    iconId: '',
  },
  {
    firebaseId: '4d7f8e50-5bbf-4113-a706-e59a14ce9629',
    id: '3b5849b5-220e-473f-8e8e-1996b2916230',
    name: 'Swiss Ball',
    description: '',
    iconId: '',
  },
  {
    firebaseId: 'c6adf8c9-8dc0-4ed3-8a20-2702e41bddf6',
    id: '1bde6d1a-825f-4047-a1d4-223642b419d9',
    name: 'SZ-Bar',
    description: '',
    iconId: '',
  },
  {
    firebaseId: '435e4455-a986-4f76-b233-95b0d920d46d',
    id: '5b5cd46c-85df-4a73-a828-1a2eae3852c1',
    name: 'Workout Machine',
    description: '',
    iconId: '',
  },
  {
    firebaseId: 'f740e6a4-d9b8-4bdb-a292-49d9b8d6ada8',
    id: '3ee4a478-4c7e-44bf-bedf-56598b9ebba9',
    name: 'Rope',
    description: '',
    iconId: '',
  },
  {
    firebaseId: 'aabdd2c3-1ca8-4612-9be5-b3a272f192ae',
    id: 'fd2f9bea-6421-45ce-92de-7ae14b1711e1',
    name: 'Dip Stand',
    description: '',
    iconId: '',
  },
];

export const gripWidths: GripWidthVO[] = [
  {
    firebaseId: 'b064d339-909c-4dcb-946e-6b7fc7bb42ce',
    id: 'c8f86b64-b3c7-4950-a9ca-b2c7a24dac55',
    name: 'Narrow',
    description:
      'Narrow grip is about 2 inches or so in from shoulder width, or just beyond hip width.',
    iconId: '',
  },
  {
    firebaseId: '71512c41-ac95-4d10-a390-0c18d60ecb43',
    id: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    name: 'Normal',
    description: 'Normal grip is a shoulder-width grip',
    iconId: '',
  },
  {
    firebaseId: '0c4f0ea5-838d-44c4-b4ce-edac42131912',
    id: 'c5be7ab8-c05a-43dc-8090-daddc474cf14',
    name: 'Wide',
    description:
      'A wide grip is a grip that is wider than shoulder width.  Around 6 inches wider than shoulder width.',
    iconId: '',
  },
];

export const gripTypes: GripTypeVO[] = [
  {
    firebaseId: '51ac89b6-692e-4b86-b01f-9374db0e4fc7',
    id: '621dd118-48d5-4fc1-8f11-54c694e8353f',
    name: 'Underhand',
    description:
      'Underhand grip is when your palms are facing towards you as you grip the bar.',
    iconId: '',
  },
  {
    firebaseId: 'aee6b848-9364-4ea2-86d4-a0dd5b202336',
    id: 'ab7dfeaf-b0d1-4a6b-8740-45824a8948f7',
    name: 'Overhand',
    description:
      'Overhand grip is when your palms are facing away from you as you grip the bar.',
    iconId: '',
  },
  {
    firebaseId: 'd90954dd-9f2a-4c08-b1d2-2f59ceb43b94',
    id: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    name: 'Neutral',
    description:
      'Neutral grip is when the palms of you hands are facing each other as you grip the handles.',
    iconId: '',
  },
];

export const parameterTypes: ParameterTypeVO[] = [
  {
    firebaseId: 'b2d4b558-425f-4824-9f5b-261f04a4bc30',
    id: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    name: 'weight & reps',
    description: 'Example: Bench press - 12 reps of 90 lb',
  },
  {
    firebaseId: 'bb9497fa-2e82-44e4-927a-87b28cb2c525',
    id: '5046e288-3dd6-4da7-81e7-677798400b3b',
    name: 'repetitions',
    description: 'Example: 30 Situps',
  },
  {
    firebaseId: 'e3d819d3-c0e5-4926-a280-c5374db20d89',
    id: '2dfbe410-5d1c-4449-a3e9-b29f6ebec693',
    name: 'duration',
    description: 'Example: 60 sec Plank',
  },
];

export const exercises: ExerciseVO[] = [
  {
    firebaseId: '3d1d5d4a-3376-4045-b9ba-cdd3c8463ae8',
    id: 'f32b6601-8bbc-4750-b46c-1c5969b3c8b9',
    name: 'Tea Cups',
    description: '',
    equipmentId: 'f4d03bda-923f-4a09-bd04-1ed1d8d008f4',
    muscleGroupIds: ['6'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: true,
  },
  {
    firebaseId: 'bcb523a3-3506-411e-ad42-dc45ffba2822',
    id: 'e9a51010-791c-499b-828f-a90712b36847',
    name: 'Tricep Kickbacks',
    description: '',
    equipmentId: 'f4d03bda-923f-4a09-bd04-1ed1d8d008f4',
    muscleGroupIds: ['4'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: true,
  },
  {
    firebaseId: '3c874392-a505-4660-833b-2668e3d38d3e',
    id: '4aea5789-c95d-4dd3-854e-804f077a7607',
    name: 'Reach for the stars',
    description: '',
    equipmentId: 'f4d03bda-923f-4a09-bd04-1ed1d8d008f4',
    muscleGroupIds: ['6'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: true,
  },
  {
    firebaseId: '35cfb6f0-815d-434a-bd7a-8dabb1e23ee7',
    id: '820950cd-5d8c-40a0-a573-34a0b0c74df5',
    name: 'Straight Arm Extensions',
    description: '',
    equipmentId: 'f4d03bda-923f-4a09-bd04-1ed1d8d008f4',
    muscleGroupIds: ['2'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: '53db13a9-6ba9-47d8-9be7-fa2cbbb0f238',
    name: 'Side Arm Raises',
    description: '',
    equipmentId: 'f4d03bda-923f-4a09-bd04-1ed1d8d008f4',
    muscleGroupIds: ['2'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: '09ef9f7f-689a-4557-b07c-77d1a1178cf7',
    name: 'Military Press',
    description: '',
    equipmentId: '57fd527b-4127-43af-944f-a44a04edf2c0',
    muscleGroupIds: ['2'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: '53db13a9-6ba9-47d8-9be7-fa2cbbb0f238',
    name: 'Bent Over Rows',
    description: '',
    equipmentId: '57fd527b-4127-43af-944f-a44a04edf2c0',
    muscleGroupIds: ['4'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: '09ef9f7f-689a-4557-b07c-77d1a1178cf7',
    name: 'Butterflies',
    description: '',
    equipmentId: 'f4d03bda-923f-4a09-bd04-1ed1d8d008f4',
    muscleGroupIds: ['9'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: '5cbe89ba-6ba7-4973-9042-d3841688adfc',
    name: 'Narrow Grip Decline Bench Press',
    description: '',
    equipmentId: '57fd527b-4127-43af-944f-a44a04edf2c0',
    muscleGroupIds: ['9'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'c8f86b64-b3c7-4950-a9ca-b2c7a24dac55',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: '11233135-e453-429b-94af-da92cedb7b8a',
    name: 'Underhand Dead Lifts',
    description: '',
    equipmentId: '57fd527b-4127-43af-944f-a44a04edf2c0',
    muscleGroupIds: ['11'],
    iconId: '',
    gripTypeId: '621dd118-48d5-4fc1-8f11-54c694e8353f',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: '064324d5-0995-42e3-a35f-d1148adea6b5',
    name: 'Hammer Curls',
    description: '',
    equipmentId: 'f4d03bda-923f-4a09-bd04-1ed1d8d008f4',
    muscleGroupIds: ['1'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: '101a7f47-7ed2-492d-b6ad-a04e43425845',
    name: 'Dumbbell Swings',
    description: '',
    equipmentId: 'f4d03bda-923f-4a09-bd04-1ed1d8d008f4',
    muscleGroupIds: ['1'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: '27884aff-3b76-4ad5-9fe9-9b39041cad9a',
    name: 'Lat Bar Pull Down',
    description: '',
    equipmentId: '57fd527b-4127-43af-944f-a44a04edf2c0',
    muscleGroupIds: ['6'],
    iconId: '',
    gripTypeId: 'ab7dfeaf-b0d1-4a6b-8740-45824a8948f7',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: '7ac15fc5-df0d-4e6b-b166-a56946129d5b',
    name: 'Skull Crushers',
    description: '',
    equipmentId: 'f4d03bda-923f-4a09-bd04-1ed1d8d008f4',
    muscleGroupIds: ['4'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: '6f2cb872-7084-49a3-81a1-19c5a4be21f0',
    name: 'Sit Down Weighted Rows',
    description: '',
    equipmentId: '5b5cd46c-85df-4a73-a828-1a2eae3852c1',
    muscleGroupIds: ['5'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: '4baf4525-e7b5-460b-8426-653339f1958f',
    name: 'V-Ups',
    description: '',
    equipmentId: '1433ea34-1255-4ee1-9e9f-39c948443659',
    muscleGroupIds: ['7'],
    iconId: '',
    gripTypeId: '',
    gripWidthId: '',
    parameterTypeId: '5046e288-3dd6-4da7-81e7-677798400b3b',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: 'beaa86cf-2e7c-4d43-9770-b13987585df8',
    name: 'Leg Lifts',
    description: '',
    equipmentId: '5b5cd46c-85df-4a73-a828-1a2eae3852c1',
    muscleGroupIds: ['11'],
    iconId: '',
    gripTypeId: '',
    gripWidthId: '',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: 'c179a3c7-6f74-43d4-8eff-ee648bb3ddd4',
    name: 'Bicycle Crunches',
    description: '',
    equipmentId: '6a05efa2-b40c-4163-8aba-b495e25bc5b6',
    muscleGroupIds: ['7'],
    iconId: '',
    gripTypeId: '',
    gripWidthId: '',
    parameterTypeId: '5046e288-3dd6-4da7-81e7-677798400b3b',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: 'cfaf9654-45f6-43f5-ba14-fa029af31aa8',
    name: 'Tricep Extentions',
    description: '',
    equipmentId: '3ee4a478-4c7e-44bf-bedf-56598b9ebba9',
    muscleGroupIds: ['4'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: false,
  },
  {
    firebaseId: '',
    id: 'cd90b6d2-2435-49b8-a269-856fea9b77fb',
    name: 'Kneeling Dumbbell Rows',
    description: '',
    equipmentId: 'f4d03bda-923f-4a09-bd04-1ed1d8d008f4',
    muscleGroupIds: ['1'],
    iconId: '',
    gripTypeId: 'e56a40a2-207d-4b11-9b4f-e1dd50d32d28',
    gripWidthId: 'cbf7efb7-eff1-48a0-869b-35293ca3eaa1',
    parameterTypeId: '769d3b23-31dd-4a16-b1d4-79e57ac305e9',
    alternateSides: true,
  },
  {
    firebaseId: '',
    id: '8890130a-138c-4800-9f67-5aec2f3186d8',
    name: 'Dips',
    description: '',
    equipmentId: 'fd2f9bea-6421-45ce-92de-7ae14b1711e1',
    muscleGroupIds: ['4'],
    iconId: '',
    gripTypeId: '',
    gripWidthId: '',
    parameterTypeId: '5046e288-3dd6-4da7-81e7-677798400b3b',
    alternateSides: false,
  },
];

export const routineTemplates: RoutineTemplateVO[] = [
  {
    firebaseId: '4d3bba0f-e1dc-418e-8bbd-997ee4725cab',
    id: 'e7b654c8-bdbd-4ad6-b5bd-f367c90750c9',
    name: 'Smokey Joes Ball Busting Back Breaking Bananza',
    workoutCategoryId: '7ce750dc-fc73-43ad-99c3-a60a8b846177',
    phases: [
      {
        id: '1d58234c-ae53-46e4-ab9e-231b93630a03',
        phaseId: '05978fe8-3cc1-4c97-9ecc-67734e954c51',
        order: 2,
        segments: [
          {
            id: '39de2419-1b50-445a-8e40-5b7b259e01ff',
            order: 3,
            trainingSetTypeId: '3fd3c30c-6c6a-4cfd-8e59-5b500e486374',
            exercises: [
              {
                id: '14047a9a-fa12-4e05-b4a0-8a0946eac6b1',
                order: 2,
                exerciseId: 'f32b6601-8bbc-4750-b46c-1c5969b3c8b9',
                sets: [
                  {
                    id: '3d54caf7-37fc-4d87-9ca8-90a20db8c5d5',
                    setNumber: 2,
                    weight: 25,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '3f09edd0-eacd-43cf-8b37-50babfd69765',
                    setNumber: 1,
                    weight: 20,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '67b335dd-a4ea-4d9d-8a6d-852ab0a31571',
                    setNumber: 3,
                    weight: 30,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
              {
                id: 'a13917f1-778a-4fab-8b70-33a0977edd53',
                order: 1,
                exerciseId: 'e9a51010-791c-499b-828f-a90712b36847',
                sets: [
                  {
                    id: '472d446d-4e76-4cea-93c7-09a99e8d432c',
                    setNumber: 3,
                    weight: 15,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '36d3ee4a-bf32-41d6-a8d6-5e7a301e440d',
                    setNumber: 1,
                    weight: 10,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'b5d2d742-3659-4644-8dd4-b8c66bc95026',
                    setNumber: 3,
                    weight: 25,
                    reps: 15,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
            ],
          },
          {
            id: '44f5eae0-236c-4f3c-8d3d-d70720aba12b',
            order: 5,
            trainingSetTypeId: '3fd3c30c-6c6a-4cfd-8e59-5b500e486374',
            exercises: [
              {
                id: '6b56f8e8-0c59-4c47-8043-cb355900e689',
                order: 1,
                exerciseId: '4aea5789-c95d-4dd3-854e-804f077a7607',
                sets: [
                  {
                    id: 'e7760ba7-a988-41f8-9398-547ae3aa4583',
                    setNumber: 2,
                    weight: 35,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'a39f54ad-4006-4000-9df9-fe528606e2e1',
                    setNumber: 3,
                    weight: 40,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '9707925e-4f81-4ee9-8ac4-a23291c88fd4',
                    setNumber: 1,
                    weight: 30,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
              {
                id: 'ca676b27-6c2a-4dbf-a06b-61ba36a4d356',
                order: 2,
                exerciseId: '820950cd-5d8c-40a0-a573-34a0b0c74df5',
                sets: [
                  {
                    id: '1e42a6a3-9521-4525-b007-c1e6a2dc7de3',
                    setNumber: 1,
                    weight: 20,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'd1c086b9-a2b2-4d9e-99eb-c34a85ae1207',
                    setNumber: 2,
                    weight: 25,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '049ef3c0-dd54-437d-a507-42ce73e48aec',
                    setNumber: 3,
                    weight: 30,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
            ],
          },
          {
            id: '48122537-73ac-4786-88c6-e807e7a3459e',
            order: 1,
            trainingSetTypeId: '3fd3c30c-6c6a-4cfd-8e59-5b500e486374',
            exercises: [
              {
                id: '29c8aab8-121e-45dd-9da0-1bb9d6f18fed',
                order: 2,
                exerciseId: '53db13a9-6ba9-47d8-9be7-fa2cbbb0f238',
                sets: [
                  {
                    id: 'bb87324d-4d51-4919-ae20-09a325f24147',
                    setNumber: 1,
                    weight: 30,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'a1bf5709-54d5-4f5d-b65c-1eaf34ce7b5f',
                    setNumber: 2,
                    weight: 35,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'f7a3a90e-4895-42ef-9192-0759bd46aeea',
                    setNumber: 3,
                    weight: 40,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
              {
                id: '6d50fb5c-b19d-448b-9fc8-d6e3203b3f5c',
                order: 1,
                exerciseId: '09ef9f7f-689a-4557-b07c-77d1a1178cf7',
                sets: [
                  {
                    id: '3d348a11-bffc-4ac7-a9e7-ab8edf4d3a21',
                    setNumber: 1,
                    weight: 35,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'ded43455-d058-4216-8054-f201e832b2f4',
                    setNumber: 2,
                    weight: 40,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'ddb07a5a-e74b-4f1d-8fa8-53dfd2eb2330',
                    setNumber: 3,
                    weight: 45,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
            ],
          },
          {
            id: '947a0216-0b48-4209-8bcb-62e23dbd7644',
            order: 2,
            trainingSetTypeId: '3fd3c30c-6c6a-4cfd-8e59-5b500e486374',
            exercises: [
              {
                id: '29c8aab8-121e-45dd-9da0-1bb9d6f18fed',
                order: 2,
                exerciseId: '53db13a9-6ba9-47d8-9be7-fa2cbbb0f238',
                sets: [
                  {
                    id: 'bb87324d-4d51-4919-ae20-09a325f24147',
                    setNumber: 1,
                    weight: 30,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'a1bf5709-54d5-4f5d-b65c-1eaf34ce7b5f',
                    setNumber: 2,
                    weight: 35,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'f7a3a90e-4895-42ef-9192-0759bd46aeea',
                    setNumber: 3,
                    weight: 40,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
              {
                id: '72e8dbc2-6be2-4913-9fb3-beccea8f4cf0',
                order: 1,
                exerciseId: '09ef9f7f-689a-4557-b07c-77d1a1178cf7',
                sets: [
                  {
                    id: 'de99d466-9bf7-45f4-9c2e-04bdaa88df65',
                    setNumber: 1,
                    weight: 12,
                    reps: 15,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '002b36b4-b89e-4b07-b5d1-bbc45229538c',
                    setNumber: 3,
                    weight: 20,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '9d955f10-0a66-478e-8ce8-6f6be94c81d3',
                    setNumber: 2,
                    weight: 15,
                    reps: 15,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
            ],
          },
          {
            id: '6fced3ac-d802-4d21-9c93-11ce5c2eadc8',
            order: 4,
            trainingSetTypeId: '3fd3c30c-6c6a-4cfd-8e59-5b500e486374',
            exercises: [
              {
                id: '09a78b3c-dd43-4f8c-8747-b19449d26a4b',
                order: 1,
                exerciseId: '5cbe89ba-6ba7-4973-9042-d3841688adfc',
                sets: [
                  {
                    id: 'fc2f5fa4-201a-48fd-88c9-90d2b639953f',
                    setNumber: 1,
                    weight: 25,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '7bf48e00-0698-4ccb-8b7a-60dc19528c28',
                    setNumber: 2,
                    weight: 30,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '737265a2-0e92-4809-aa02-4b6b7616533a',
                    setNumber: 3,
                    weight: 35,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
              {
                id: '006a42ac-268b-4533-8beb-525380c7f4d5',
                order: 1,
                exerciseId: '11233135-e453-429b-94af-da92cedb7b8a',
                sets: [
                  {
                    id: 'e644662c-e7ff-4718-b5c3-d95c6c0de62d',
                    setNumber: 1,
                    weight: 20,
                    reps: 10,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '372bcf43-13c7-40fb-ba08-7613676e30bc',
                    setNumber: 3,
                    weight: 30,
                    reps: 10,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '5eef6704-20ab-4e8c-9a28-183a0d4c4eb9',
                    setNumber: 2,
                    weight: 25,
                    reps: 15,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'c86fbd21-70ae-43d4-a933-22f6187dfd05',
            order: 6,
            trainingSetTypeId: '3fd3c30c-6c6a-4cfd-8e59-5b500e486374',
            exercises: [
              {
                id: '12dd9134-f83d-4f1f-b1fe-251ee22d7a9a',
                order: 2,
                exerciseId: '064324d5-0995-42e3-a35f-d1148adea6b5',
                sets: [
                  {
                    id: '8a8fbd4e-5356-4321-b07f-280ed50a9d3e',
                    setNumber: 1,
                    weight: 30,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'c7fc805b-fdf6-4350-ae7e-e2cff773423a',
                    setNumber: 2,
                    weight: 35,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '2f10d567-0165-4d1f-9279-3ff36096bb1b',
                    setNumber: 3,
                    weight: 40,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
              {
                id: '335d2ae7-de43-42dc-8615-fbad4038cefa',
                order: 1,
                exerciseId: '101a7f47-7ed2-492d-b6ad-a04e43425845',
                sets: [
                  {
                    id: '3b4d2af3-17cb-4262-a0da-84bc06c295d5',
                    setNumber: 1,
                    weight: 12,
                    reps: 15,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '0e223de4-690f-4e3c-9c65-8ce70dfb84ba',
                    setNumber: 3,
                    weight: 20,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'ed5cf43c-1f78-4a90-a1c4-afb7c78afdbe',
                    setNumber: 2,
                    weight: 15,
                    reps: 15,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'aebb020c-42ee-473b-9e65-9ceeaa11f250',
        phaseId: '5013c328-7cdd-4ae9-bd1a-046d6433a653',
        order: 1,
        segments: [
          {
            id: 'ebca8f35-a12d-4ac4-83e0-fbbbff5d51ee',
            order: 6,
            trainingSetTypeId: '40ac0220-8032-4860-81dd-68943d786123',
            exercises: [
              {
                id: 'c8a4deae-9e96-4ff1-85f2-381a96f7f7e1',
                order: 1,
                exerciseId: '27884aff-3b76-4ad5-9fe9-9b39041cad9a',
                sets: [
                  {
                    id: 'd06c510f-3449-4bc7-afa6-a17036add9f4',
                    setNumber: 3,
                    weight: 35,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '1915867b-b33c-433f-a91c-7732a0fb275c',
                    setNumber: 2,
                    weight: 30,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'fada3dc2-aef0-4b23-bd17-bfc3f78675f8',
                    setNumber: 1,
                    weight: 25,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
            ],
          },
          {
            id: '5f52f98b-7d4c-4475-8dd7-176af3c855e2',
            order: 3,
            trainingSetTypeId: '3fd3c30c-6c6a-4cfd-8e59-5b500e486374',
            exercises: [
              {
                id: 'c9d3efc2-ae03-4c48-92d9-5501845d6b4a',
                order: 2,
                exerciseId: '7ac15fc5-df0d-4e6b-b166-a56946129d5b',
                sets: [
                  {
                    id: '0bc7998e-df94-4f84-b0f3-f130f6e59aac',
                    setNumber: 2,
                    weight: 40,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '688bc621-71a9-44f4-b915-d6fddcea0982',
                    setNumber: 3,
                    weight: 45,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'add1094b-ece4-41fd-998d-6cda81759f5d',
                    setNumber: 1,
                    weight: 35,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
              {
                id: '2e8637c7-7de4-4d4c-9d3d-0a5c2cc52b94',
                order: 1,
                exerciseId: '6f2cb872-7084-49a3-81a1-19c5a4be21f0',
                sets: [
                  {
                    id: 'e77372f3-e0b1-4229-9836-4dccfb2f2126',
                    setNumber: 1,
                    weight: 15,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'ad7ee05e-7e55-4b1f-9249-2ac30c97ee22',
                    setNumber: 2,
                    weight: 20,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'e9610638-8e46-4a89-af26-a8f1d6b22e3e',
                    setNumber: 3,
                    weight: 25,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
            ],
          },
          {
            id: '9b759c08-c3a0-4543-bf5a-fdaa8be70970',
            order: 1,
            trainingSetTypeId: '40ac0220-8032-4860-81dd-68943d786123',
            exercises: [
              {
                id: 'c39a4780-a2df-4ad9-8be2-54b8cd2f3685',
                order: 1,
                exerciseId: '4baf4525-e7b5-460b-8426-653339f1958f',
                sets: [
                  {
                    id: '8312f4d6-b1d7-4b7b-ad5e-6078ad895928',
                    setNumber: 2,
                    weight: 0,
                    reps: 8,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '91d8eb6e-f79d-4745-ac1f-dbcff0967640',
                    setNumber: 1,
                    weight: 0,
                    reps: 5,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '9fa0f593-1019-4051-85dd-624aafe0f9eb',
                    setNumber: 3,
                    weight: 0,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'd0ca74c0-d34a-4d36-82f5-1b5ec833da08',
            order: 5,
            trainingSetTypeId: '3fd3c30c-6c6a-4cfd-8e59-5b500e486374',
            exercises: [
              {
                id: '7478f052-1d5e-4d0e-b55e-4b6f1cc98503',
                order: 2,
                exerciseId: 'beaa86cf-2e7c-4d43-9770-b13987585df8',
                sets: [
                  {
                    id: 'd796df06-0f9b-49ef-a0d2-84479246e51e',
                    setNumber: 2,
                    weight: 30,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'd3b888b7-963d-4c3b-b763-4b12522b2f78',
                    setNumber: 1,
                    weight: 25,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'fc2e899c-fdb8-43c6-81bc-d721e4c1df4b',
                    setNumber: 3,
                    weight: 35,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
              {
                id: '97e5c08a-d59e-4722-976e-cc08154d75bf',
                order: 1,
                exerciseId: 'cfaf9654-45f6-43f5-ba14-fa029af31aa8',
                sets: [
                  {
                    id: '089741ae-bd50-457b-a852-ecefa2471b63',
                    setNumber: 1,
                    weight: 10,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'b5f7dfac-28b6-4f67-a259-429d3303b9cd',
                    setNumber: 2,
                    weight: 15,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '2879b78a-cf5e-4a96-8002-d8fc4675a91f',
                    setNumber: 3,
                    weight: 20,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
            ],
          },
          {
            id: '4efada31-ba64-4950-b16d-935a5134ba38',
            order: 2,
            trainingSetTypeId: '40ac0220-8032-4860-81dd-68943d786123',
            exercises: [
              {
                id: 'a512fd89-a16e-49fa-8f18-09495ee42735',
                order: 1,
                exerciseId: 'c179a3c7-6f74-43d4-8eff-ee648bb3ddd4',
                sets: [
                  {
                    id: 'f8d8b45e-6787-4b9d-bd69-3c898cd16acc',
                    setNumber: 2,
                    weight: 0,
                    reps: 125,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'e84674fc-47dd-48c5-9f36-e84bb1ac88ef',
                    setNumber: 1,
                    weight: 0,
                    reps: 100,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '4d25fe39-4992-4044-a311-c20a0fe3b76e',
                    setNumber: 3,
                    weight: 0,
                    reps: 150,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
            ],
          },
          {
            id: '09475914-dbc3-405e-a967-1860f712709a',
            order: 4,
            trainingSetTypeId: '3fd3c30c-6c6a-4cfd-8e59-5b500e486374',
            exercises: [
              {
                id: '91aee288-2ea2-477c-805a-52021f25110f',
                order: 1,
                exerciseId: 'cd90b6d2-2435-49b8-a269-856fea9b77fb',
                sets: [
                  {
                    id: '1602158f-d60c-42c0-89a6-6d44308f35ae',
                    setNumber: 2,
                    weight: 35,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'b39a96fe-d66a-4def-9e64-8ebd58463483',
                    setNumber: 3,
                    weight: 40,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '3366737e-304a-4432-897e-15171d0a32de',
                    setNumber: 1,
                    weight: 30,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
              {
                id: '67304d69-a827-4101-91cb-2eb09abee63f',
                order: 2,
                exerciseId: '8890130a-138c-4800-9f67-5aec2f3186d8',
                sets: [
                  {
                    id: '2d2d1447-b389-4b8f-8689-8ea4d775a49d',
                    setNumber: 1,
                    weight: 0,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: 'f5068e1a-8e04-4019-bf07-6e090fb25d1a',
                    setNumber: 2,
                    weight: 0,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                  {
                    id: '128566f4-6046-445d-8b1f-3a332da604cc',
                    setNumber: 3,
                    weight: 0,
                    reps: 12,
                    duration: {
                      currentTimeMs: 0,
                      currentTimeSec: 0,
                      currentTimeMin: 0,
                    },
                    distance: {
                      unit: '',
                      value: 0,
                    },
                    markedDone: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];