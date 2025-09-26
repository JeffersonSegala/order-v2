import React, { useState, useEffect, ReactNode } from 'react';
import './style.css';

interface WindowProps {
  children?: ReactNode;
  title?: string;
  id?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onEdit?: () => void;
  hint?: string;
  onOpen?: () => void;
  onCopy?: () => void;
}

const Window: React.FC<WindowProps> = ({ children, title, id, isOpen = false, onClose, onEdit, hint, onOpen, onCopy }) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    if (open && onOpen) {
      onOpen();
    }
  }, [open, onOpen]);

  return (
    <div className="window" id={id}>
      <div className='window__headers'>
        <div className='window__pointer' onClick={() => setOpen(open => !open)} title={hint} >
          <img src={open ? 'minusIcon.png' : 'plusIcon.png'} className="window__header-icon" alt="" />
          {title}
        </div>
        <div className='window__actions'>
          {onCopy &&
            <img src={'copyIcon.png'} className="window__header-icon" alt="" onClick={onCopy} title="Copiar" />
          }
          {onEdit &&
            <img src={'iconOptions.jpg'} className="window__header-icon" alt="" onClick={onEdit} title="Editar" />
          }
          {onClose &&
            <img src={'iconClose.jpg'} className="window__header-icon" alt="" onClick={onClose} title="Excluir" />
          }
        </div>
      </div>
      {open && children}
    </div>
  );
}

export default Window;
