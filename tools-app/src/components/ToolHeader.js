import PropTypes from 'prop-types';


export function ToolHeader(props) {

  return (
    <header>
      <h1>{props.appName}</h1>
      <h2>{props.toolName}</h2>
    </header>
  );

}

ToolHeader.defaultProps = {
  appName: 'Tools App',
};

ToolHeader.propTypes = {
  appName: PropTypes.string.isRequired,
  toolName: PropTypes.string,
};

// export function ToolHeader({ appName, toolName }) {

//   return (
//     <header>
//       <h1>{appName}</h1>
//       <h2>{toolName}</h2>
//     </header>
//   );

// }