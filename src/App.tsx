import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charsAllowed, setCharsAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  // Making use of useCallback memoization to cache the result into the memory.
  const passwordGenerator = useCallback(() => {
    let password = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charsAllowed) str += '~!@#$%^&*()';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor((Math.random() * str.length) + 1);
      password += str.charAt(randomIndex);
    }

    setPassword(password);
  }, [
    length,
    numberAllowed,
    charsAllowed,
    setPassword
  ]);

  const copyPasswordToClipboard = useCallback(() => {
    ((passwordRef.current) as any)?.select();
    // Only to select some values not whole password, Uncomment below line to try this once.
    // ((passwordRef.current) as any)?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charsAllowed, passwordGenerator]);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef} />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => setLength((e as any).target.value)} />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' onChange={(e) => setNumberAllowed((e as any).target.checked)} />
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={charsAllowed} id='charsInput' onChange={(e) => setCharsAllowed((e as any).target.checked)} />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
