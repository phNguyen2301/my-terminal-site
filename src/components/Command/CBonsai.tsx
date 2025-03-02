import React, { useEffect, useRef } from "react";

const BonsaiTree: React.FC = () => {
    const life = 32;
    const rows = 24;
    const cols = 50;
    const middle = Math.floor(cols / 2);
    const grid = new Array(rows).fill(0).map(() => new Array(cols).fill(" "));
    const colorGrid = new Array(rows).fill(0).map(() => new Array(cols).fill({ color: "#fff", bold: false }));
    // const [currentFrame, setCurrentFrame] = useState<string[][]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let shootCounter = Math.floor(Math.random() * 10);

    const colorPalet = {
        "black": "#0C0C0C",
        "red": "#C50F1F",
        "green": "#13A10E",
        "yellow": "#C19C00",
        "blue": "#0037DA",
        "purple": "#881798",
        "cyan": "#3A96DD",
        "white": "#CCCCCC",
        "brightBlack": "#767676",
        "brightRed": "#E74856",
        "brightGreen": "#16C60C",
        "brightYellow": "#F9F1A5",
        "brightBlue": "#3B78FF",
        "brightPurple": "#B4009E",
        "brightCyan": "#61D6D6",
        "brightWhite": "#F2F2F2"
    }

    const branchType = {
        trunk: 0,
        shootLeft: 1,
        shootRight: 2,
        dying: 3,
        dead: 4
    }

    const drawbase = (posX: number, posY: number) => {
        const base = [
            " :___________./~~~\\.___________:",
            "  \\                           / ",
            "   \\_________________________/  ",
            "   (_)                     (_)   ",
        ]
        const baseWidth = base[0].length;
        const baseHeight = base.length;
        for (let i = 0; i < baseHeight; i++) {
            for (let j = 0; j < baseWidth; j++) {
                if (base[i][j] == " ") continue
                const curPosY = posY-baseHeight+i
                const curPosX = posX-baseWidth/2+j
                let color = colorPalet.white;
                 if (i === 0 && j > 12 && j < 20 ) {
                    color = colorPalet.brightYellow
                }
                else if (i === 0 && j !== 1 && j !== baseWidth - 1){
                    color = colorPalet.green
                }
                grid[curPosY][curPosX] = base[i][j];
                colorGrid[curPosY][curPosX] = { color: color, bold: true };
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

    const chooseColor = (type: number) => {
        switch(type) {
            case branchType.trunk:
            case branchType.shootLeft:
            case branchType.shootRight:
                if (roll(2) === 0) return {color: colorPalet.brightYellow, bold: true};
                else return {color: colorPalet.brightYellow, bold: false};
            case branchType.dying:
                if (roll(10) === 0) return {color: colorPalet.brightYellow, bold: true};
                else return {color: colorPalet.green, bold: false};
            case branchType.dead:
                if (roll(3) === 0) return {color: colorPalet.brightGreen, bold: true};
                else return {color: colorPalet.brightGreen, bold: false};
            default:
                return {color: colorPalet.white, bold: false};
        }
    }

    const renderToCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const fontSize = 16;
        const charWidth = 9;  
        
        ctx.font = `${fontSize}px monospace`;
        
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] !== " ") {
                    const styleInfo = colorGrid[y][x];
                    ctx.fillStyle = styleInfo?.color || '#fff';                   
                    ctx.font = styleInfo?.bold ? `bold ${fontSize}px monospace` : `${fontSize}px monospace`;
                    ctx.fillText(grid[y][x], x * charWidth, y * fontSize);
                }
            }
        }
    }

    const branch = async (posX: number, posY: number, life: number, type: number) => {
        let dx = 0;
        let dy = 0;
        let age = 0;
        const multiplier = 5;
        const lifeStart = 30;
        let shootCooldown = multiplier;
    
        while (life > 0) {
            life--;
            age = lifeStart - life;
            const delta = setDeltas(type, life, age, multiplier);
            dx = delta.dx;
            dy = delta.dy;
    
            if (dy > 0 && posY > (rows - 8)) dy--;
    
            await new Promise(resolve => setTimeout(resolve, 100));
    
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
            if (char.length > 1) {
                for (let i = 0; i < char.length; i++) {
                    if (posX + i < cols) {
                        grid[posY][posX+i] = char[i];
                        colorGrid[posY][posX+i] = chooseColor(type);
                    }
                }
            }
            else{
                grid[posY][posX] = char;
                colorGrid[posY][posX] = chooseColor(type);
            }
            renderToCanvas();
        }
    };

    useEffect(() => {
        if (canvasRef.current) {
            const charWidth = 9;  
            const lineHeight = 16; 
            canvasRef.current.width = cols * charWidth;
            canvasRef.current.height = rows * lineHeight;
        }
        
        const generateTree = async () => {
            drawbase(middle, rows);
            await branch(middle, rows - 5, life, branchType.trunk);
        };
        generateTree();
    }, []);

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <canvas
                ref={canvasRef}
                style={{
                    background: "#1a1a1a",
                }}
                />
        </div>
    );
}

export default BonsaiTree;