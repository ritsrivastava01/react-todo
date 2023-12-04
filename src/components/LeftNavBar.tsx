export default function LeftNavBar() {
  console.log('render side bar');
  return (
    <div className='border-r w-1/2 border-slate-900/10'>
      <ul>
        <li className='mt-4'>
          <a href='./link1'>Link 1</a>
        </li>
        <li className='mt-4'>
          <a href='./link2'>Link 2</a>
        </li>
        <li className='mt-4'>
          <a href='./link3'>Link 3</a>
        </li>
        <li className='mt-4'>
          <a href='./link4'>Link 4</a>
        </li>
      </ul>
    </div>
  );
}
