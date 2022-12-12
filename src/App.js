import { useState } from 'react';
import './App.css';

function App() {
  return (
    <Table />
  );
}

const Item = (props) => {
  return (
    <div className='Itembox' style={{background: props.state ? 'blue' : 'white'}}/>
  );
}

const Row = (props) => {
  return (
    <div className='Row-container'>
      {[1,2,3,4,5,6,7,8].map(i =>
        <Item key={i} state={props.state === i}/>
      )}
    </div>
  );
}

const Table = (props) => {

  const [states, setStates] = useState({index: 0, store: [[0,0,0,0,0,0,0,0]]});

  const checkState = (i,s) => {
    let j = i - 1;
    while(j>=0) {
      //console.log("checkState",i,s,j);
      let a = s[i];
      let b = s[i] - (i-j);
      let c = s[i] + (i-j);

      if(s[j] === a || s[j] === b || s[j] === c) {
        //console.log("checkState false",i,s,j);
        return false;
      }
      
      j--;
    }

    //console.log("checkState true",i,s,j);
    return true;
  }

  const nextState = () => {
    let s = states.store[states.index].map(item => item);
    let i = 0;

    if(s[7]!==0)
      i=7;

    //console.log("nextState before while",i,s);
    while(i<8) {      
      s[i]++;
      while(s[i]<9 && !checkState(i, s))
        s[i]++;

      if(s[i]===9 && i===0) {
        //console.log("nextState before zeroing",i,s);
        setStates(st => { return { index: 0, store: st.store } });
        return;
      }

      if(s[i]===9) {
        s[i] = 0;
        i--;
        //console.log("nextState after decrement",i,s);
        continue;
      }      

      i++;
      //console.log("nextState after inc",i,s);
    }

    if(s[0]!==0) {
      console.log("nextState result",s,states);
      setStates(st => { return st.store.length === st.index+1 ? 
                                  ( st.store[0][0] === 0 ? 
                                      { index: st.index, store: [s.map(item => item)] } :
                                      { index: st.index+1, store: [...st.store, s.map(item => item)] } 
                                  ) : 
                                  { index: st.index+1, store: st.store } ; 
                      });
    }
  }

  const prevState = () => {
    console.log("nextState result",states);
    setStates(st => {  return st.index!==0 ? 
                                { index: st.index-1, store: st.store } :
                                { index: st.store.length-1, store: st.store }
                    }); 
}

  return (
    <div>
      <div>
        {states.store[states.index].map((rowstate,i) => {return (
          <Row key={i} state={rowstate}/>);})
        }
      </div>
      <br />
      {states.store[0][0] === 0 ? 0 : states.index + 1}/{states.store[0][0] === 0 ? 0 : states.store.length}
      <br />   
      <br />   
      <button onClick={prevState}>Prev</button> <button onClick={nextState}>Next</button>
    </div>
  );
}

export default App;
