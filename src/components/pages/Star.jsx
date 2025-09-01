import { useContext } from 'react';
import { StateContext } from './../providers/StateContext';
import { StarList } from './../blocks/StarList';

export const Star = () => {
  const {textlist} = useContext(StateContext);

  return <><StarList data={textlist.filter(t => t.isStar === true)}/></>;
};
