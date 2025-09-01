import { useContext } from 'react';
import { StateContext } from './../providers/StateContext';
import { TextList } from './../blocks/TextList';

export const History = () => {
  const {textlist} = useContext(StateContext);

  return <><TextList data={textlist}/></>;
};
