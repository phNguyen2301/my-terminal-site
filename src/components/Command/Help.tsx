  import { commands } from "../../constants/command";
  
  const Help: React.FC = () => {
    return (
      <div data-testid="help">
        {commands.map(({ cmd, desc }) => (
          <div key={cmd}>
            <span>{cmd}</span>
            <span>- {desc}</span>
          </div>
        ))}
        <div>
          <div>Tab =&gt; autocompletes the command</div>
          <div>Up Arrow =&gt; go back to previous command</div>
          <div>Ctrl + l =&gt; clear the terminal</div>
        </div>
      </div>
    );
  };
  
  export default Help;