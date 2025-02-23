import { useState, useEffect, useContext } from "react";
import { termContext } from "../Tabs/Terminal";


const BonsaiTree = () => {
    const { clearHistory } = useContext(termContext);
    const life = 32;
    const rows = 25;
    const cols = 100;
    const middle = Math.floor(cols / 2);
    const grid = new Array(rows).fill(0).map(() => new Array(cols).fill(" "));
    const [currentFrame, setCurrentFrame] = useState<string[][]>([]);
    let shootCounter = Math.floor(Math.random() * 10);

    const branchType = {
        trunk: 0,
        shootLeft: 1,
        shootRight: 2,
        dying: 3,
        dead: 4
    }

    const drawbase = (posX: number, posY: number) => {
        const base = [
            " ___________./~~~\\.___________",
            " \\                           /",
            "  \\_________________________/ ",
            "  (_)                     (_)  ",
        ]
        const baseWidth = base[0].length;
        const baseHeight = base.length;
        for (let i = 0; i < baseHeight; i++) {
            for (let j = 0; j < baseWidth; j++) {
                grid[posY-baseHeight+i][posX-baseWidth/2+j] = base[i][j];
            }
        }
    }
    
    const setDeltas = (type: number, life: number, age: number, multiplier: number) => {
        let dx = 0;
        let dy = 0;
        let dice;
        switch (type) {
            case branchType.trunk:
                if (age <= 2 || life < 4) {
                    dy = 0;
                    dx = (roll(3)) - 1;
                }
                else if (age < (multiplier * 3)) {
                    if (age %  Math.round(multiplier * 0.5) === 0) dy = -1;
                    else dy = 0;

                    dice = roll(10);
                    if (dice >= 0 && dice <=0) dx = -2;
                    else if (dice >= 1 && dice <= 3) dx = -1;
                    else if (dice >= 4 && dice <= 5) dx = 0;
                    else if (dice >= 6 && dice <= 8) dx = 1;
                    else if (dice >= 9 && dice <= 9) dx = 2;
                }
                else {
                    dice = roll(10);
                    if (dice > 2) dy = -1;
                    else dy = 0;
                    dx = (roll(3)) - 1;
                }
                break;
            case branchType.shootLeft:
                dice = roll(10);
                if (dice >= 0 && dice <= 1) dy = -1;
                else if (dice >= 2 && dice <= 7) dy = 0;
                else if (dice >= 8 && dice <= 9) dy = 1;

                dice = roll(10);
                if (dice >= 0 && dice <= 1) dx = -2;
                else if (dice >= 2 && dice <= 5) dx = -1;
                else if (dice >= 6 && dice <= 8) dx = 0;
                else if (dice >= 9 && dice <= 9) dx = 1;
                break;
            case branchType.shootRight:
                dice = roll(10);
                if (dice >= 0 && dice <= 1) dy = -1;
                else if (dice >= 2 && dice <= 7) dy = 0;
                else if (dice >= 8 && dice <= 9) dy = 1;

                dice = roll(10);
                if (dice >= 0 && dice <= 1) dx = 2;
                else if (dice >= 2 && dice <= 5) dx = 1;
                else if (dice >= 6 && dice <= 8) dx = 0;
                else if (dice >= 9 && dice <= 9) dx = -1;
                break;
            case branchType.dying:
                dice = roll(10);
                if (dice >= 0 && dice <= 1) dy = -1;
                else if (dice >= 2 && dice <= 8) dy = 0;
                else if (dice >= 9 && dice <= 9) dy = 1;

                dice = roll(15);
                if (dice >= 0 && dice <=0) dx = -3;
                else if (dice >= 1 && dice <= 2) dx = -2;
                else if (dice >= 3 && dice <= 5) dx = -1;
                else if (dice >= 6 && dice <= 8) dx = 0;
                else if (dice >= 9 && dice <= 11) dx = 1;
                else if (dice >= 12 && dice <= 13) dx = 2;
                else if (dice >= 14 && dice <= 14) dx = 3;
                break;
            case branchType.dead:
                dice = roll(10);
                if (dice >= 0 && dice <= 2) dy = -1;
                else if (dice >= 3 && dice <= 6) dy = 0;
                else if (dice >= 7 && dice <= 9) dy = 1;
                dx = (roll(3)) - 1;
                break;
            default:
                break;
        }
        return {dx, dy};
    }
        
    const chooseChar = (dx: number, dy: number, life: number, type: number) => {
        let char = "?";
            if (life < 4) type = branchType.dying;

        switch (type) {
            case branchType.trunk:
                if (dy === 0) char = "/~";
                else if (dx < 0) char = "\\|";
                else if (dx === 0) char = "/|\\";
                else if (dx > 0) char = "|/";
                break;
            case branchType.shootLeft:
                if (dy > 0) char = "\\";
                else if (dy === 0) char = "\\_";
                else if (dx < 0) char = "\\|";
                else if (dx === 0) char = "/|";
                else if (dx > 0) char = "/";
                break;
            case branchType.shootRight:
                if (dy > 0) char = "/";
                else if (dy === 0) char = "_/";
                else if (dx < 0) char = "\\|";
                else if (dx === 0) char = "/|";
                else if (dx > 0) char = "/";
                break;
            case branchType.dying:
            case branchType.dead:
                char = "&";
                break;
            default:
                break;
        }
        return char;
    }

    const roll = (mod: number) => {
        return Math.floor(Math.random() * mod);
    }
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chooseColor = (type: number) => {
        switch(type) {
            case branchType.trunk:
            case branchType.shootLeft:
            case branchType.shootRight:
                if (roll(2) === 0) return {color: "#0000FF", bold: true};
                else return {color: "#000000", bold: false};
            case branchType.dying:
                if (roll(10) === 0) return {color: "#FF0000", bold: true};
                else return {color: "#000000", bold: false};
            case branchType.dead:
                if (roll(3) === 0) return {color: "#FF0000", bold: true};
                else return {color: "#000000", bold: false};
            default:
                return {color: "#000000", bold: false};
        }
    }

    const branch = async (posX: number, posY: number, life: number, type: number) => {
        let dx = 0;
        let dy = 0;
        let age = 0;
        const multiplier = 5;
        const lifeStart = 32;
        let shootCooldown = multiplier;
    
        while (life > 0) {
            life--;
            age = lifeStart - life;
            const delta = setDeltas(type, life, age, multiplier);
            dx = delta.dx;
            dy = delta.dy;
    
            if (dy > 0 && posY > (rows - 8)) dy--;
    
            await new Promise(resolve => setTimeout(resolve, 50));
    
            if (life < 3) {
                branch(posX, posY, life, branchType.dead);
            }
            else if (type === branchType.trunk && life < (multiplier + 2)) {
                branch(posX, posY, life, branchType.dying);
            }
            else if ((type === branchType.shootLeft || type === branchType.shootRight) && life < (multiplier + 2)) {
                branch(posX, posY, life, branchType.dying);
            }
            else if (type === branchType.trunk && ((roll(3) === 0) || (life % multiplier === 0))) {
                if ((roll(8) === 0) && life > 7) {
                    shootCooldown = multiplier * 2;
                    branch(posX, posY, life + (roll(5) - 2), branchType.trunk);
                }
                else if (shootCooldown <= 0) {
                    shootCooldown = multiplier * 2;
                    const shootLife = (life + multiplier);
                    shootCounter++;
    
                    branch(posX, posY, shootLife, shootCounter % 2 + 1);
                }
                shootCooldown--;
            }
            posX += dx;
            posY += dy;
            const char = chooseChar(dx, dy, life, type);
            grid[posY][posX] = char;
            
            setCurrentFrame([...grid]);
        }
    };


    useEffect(() => {
        // clearHistory?.();
        const generateTree = async () => {
            drawbase(middle, rows);
            await branch(middle, rows - 5, life, branchType.trunk);
        };
        
        generateTree();
    }, []);

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
            <textarea 
                style={{
                     backgroundColor: "#1a1a1a"
                }}
                cols={100} 
                rows={25} 
                value={currentFrame.map(row => row.join("")).join("\n")} 
                readOnly 
            />
        </div>
    )
}

export default BonsaiTree;

