import { TrainingSetType } from '../models/AppInterfaces';

export const trainingSetTypes: TrainingSetType[] = [
  {
    id: '40ac0220-8032-4860-81dd-68943d786123',
    name: 'Straight Set',
    description:
      'Performing straight sets is the standard method for arranging your weight training workout. Straight sets require you to perform a number of sets using the same number of repetitions and using the same weight. For example, you may perform three sets of 12 repetitions using 40 pounds for a particular exercise and two sets of six repetitions using 75 pounds for another.',
    iconId: '503bd6e6-02ca-44f3-9f8e-c20ad466419f',
  },
  {
    id: '3fd3c30c-6c6a-4cfd-8e59-5b500e486374',
    name: 'Superset',
    description:
      'Pairing exercises is called super setting. You do not rest between pairings, but only on completion of the second exercise within the super set. There are three main types of super sets. In agonist super sets, you pair exercises that work the same muscle group. For example, you can combine lunges with squats or bench presses with push ups. In antagonist super sets, you pair exercises that work opposite muscle groups, as with lat pull downs and shoulder presses or leg extensions and leg curls. In upper body / lower body super sets, you pair an upper body exercise with a lower body exercises. For example, you can combine bench presses with lunges or step ups with biceps curls. All of these types of super sets allow you to perform more work in less time, which makes them very useful if you only have a short time to work out. All super set methods will increase the intensity of your workout by reducing the amount of time you rest.',
    iconId: '',
  },
  {
    id: '08d72ffa-6856-4bab-ad8a-fc019bdc2809',
    name: 'Giant Set',
    description:
      'If you combine three exercises, this is called a tri set. Groupings of four or more exercises are called giant sets. Both tri sets and giant sets will further increase the intensity of your workout.',
    iconId: '',
  },
  {
    id: '37ee55d5-3e52-4f36-b829-1874de7f2c0e',
    name: 'Drop Set',
    description:
      "Drop sets are used by bodybuilders to increase muscle mass and also will increase your muscular endurance. Drop sets allow you to extend your set beyond its normal termination point. Usually, when performing any exercise, you have to stop because your muscles are tired. However, they are only too tired to lift the weight you are using and are not completely exhausted. When performing drop sets, once you have reached muscular failure--the point at which you can't continue lifting the weight--you immediately reduce, or drop, the weight and continue your set using a lighter weight to work your muscles more intensely.\n" +
      '\n' +
      'An example for bicep curls would be performing 10 reps using 35 pounds to failure, then seven reps using 27.5 pounds to failure, finishing with six reps using 20 pounds to failure.',
    iconId: '',
  },
  {
    id: '3fd3c30c-6c6a-4cfd-8e59-5b500e486374',
    name: 'Pyramid',
    description:
      'When you perform pyramid sets, you manipulate the weight used and repetitions performed as you progress through your workout. For example, in set one you do 12 reps with 60 pounds; in set two, you perform 10 reps with 70 pounds; and in set three, you do eight reps with 80 pounds. Pyramid sets allow you to warm up gradually as you increase the intensity of your workout.',
    iconId: '',
  },
  {
    id: '5b3ba1b6-92a9-489b-a51a-2ac0afdb99ca',
    name: 'Circuit',
    description:
      'A circuit is a series of exercises performed in a row. Exercises in a circuits are usually performed with light weight or just bodyweight. They are mainly used for weight loss, endurance or more cardio-focused goals. Circuits are popular in group fitness settings where multiple people are cycling through exercises or equipment together.',
    iconId: '',
  },
];
