import React from 'react'
import './PseudocodeComponent.css'
import { useLocation } from 'react-router-dom';
import pseudocodigos from '../../../mocks/pseudocodigos.json'

const PseudocodeComponent = ({routeName}) => {
    const location = useLocation();
    const selectedPseudocodigo = pseudocodigos.find(p => p.id === routeName);

    // const[selected, setSelected] = React.useState(null);
    const selectedId = 3; 
    const selectedLine = "p" + selectedId.toString();

    return (
      <div className='code_body_text'>
          {selectedPseudocodigo.content && selectedPseudocodigo.content.length > 0 &&
            Object.keys(selectedPseudocodigo.content[0])
              .sort((a, b) => {
                const numA = parseInt(a.replace('p', ''));
                const numB = parseInt(b.replace('p', ''));
                return numA - numB;
              })
              .map((key) => (
                <pre key={key} className={`code_line${selectedLine === key ? '-selected' : ''}`}>
                  {selectedPseudocodigo.content[0][key]}
                </pre>
              ))
          }
      </div>
  )
}

export default PseudocodeComponent
