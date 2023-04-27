import React from 'react'
import './ChessBoard.css'
import blackKing from './visualAssets/blackKing.svg'
import whiteKing from './visualAssets/whiteKing.svg'
import blackBishop from './visualAssets/blackBishop.svg'
import whiteBishop from './visualAssets/whiteBishop.svg'
import blackKnight from './visualAssets/blackKnight.svg'
import whiteKnight from './visualAssets/whiteKnight.svg'
import blackPawn from './visualAssets/blackPawn.svg'
import whitePawn from './visualAssets/whitePawn.svg'
import blackQueen from './visualAssets/blackQueen.svg'
import whiteQueen from './visualAssets/whiteQueen.svg'
import blackRook from './visualAssets/blackRook.svg'
import whiteRook from './visualAssets/whiteRook.svg'


const ChessBoard = () => {
    return (
        <div className="ChessBoardContainer">
            <div className="Tile">
                <img src={blackRook} alt="Black Rook" />
            </div>
            <div>
                <img src={blackKnight} alt="Black Knight" />
            </div>
            <div>
                <img src={blackBishop} alt="Black Bishop" /></div>
            <div>
                <img src={blackQueen} alt="Black Queen" /></div>
            <div>
                <img src={blackKing} alt="Black King" />
            </div>
            <div>
                <img src={blackBishop} alt="Black Bishop"/>
            </div>
            <div>
                <img src={blackKnight} alt="Black Knight"/>
            </div>
            <div>
                <img src={blackRook} alt="Black Rook"/>
            </div>
            <div>
                <img src={blackPawn} alt="Black Pawn"/>
            </div>
            <div>
                <img src={blackPawn} alt="Black Pawn"/>
            </div>
            <div>
                <img src={blackPawn} alt="Black Pawn"/>
            </div>
            <div>
                <img src={blackPawn} alt="Black Pawn"/>
            </div>
            <div>
                <img src={blackPawn} alt="Black Pawn"/>
            </div>
            <div>
                <img src={blackPawn} alt="Black Pawn"/>
            </div>
            <div>
                <img src={blackPawn} alt="Black Pawn"/>
            </div>
            <div>
                <img src={blackPawn} alt="Black Pawn"/>
            </div>
            <div>17</div>
            <div>18</div>
            <div>19</div>
            <div>20</div>
            <div>21</div>
            <div>22</div>
            <div>23</div>
            <div>24</div>
            <div>25</div>
            <div>26</div>
            <div>27</div>
            <div>28</div>
            <div>29</div>
            <div>30</div>
            <div>31</div>
            <div>32</div>
            <div>33</div>
            <div>34</div>
            <div>35</div>
            <div>36</div>
            <div>37</div>
            <div>38</div>
            <div>39</div>
            <div>40</div>
            <div>41</div>
            <div>42</div>
            <div>43</div>
            <div>44</div>
            <div>45</div>
            <div>46</div>
            <div>47</div>
            <div>48</div>
            <div>
                <img src={whitePawn} alt="White Pawn"/>
            </div>
            <div>
                <img src={whitePawn} alt="White Pawn"/>
            </div>
            <div>
                <img src={whitePawn} alt="White Pawn"/>
            </div>
            <div>
                <img src={whitePawn} alt="White Pawn"/>
            </div>
            <div>
                <img src={whitePawn} alt="White Pawn"/>
            </div>
            <div>
                <img src={whitePawn} alt="White Pawn"/>
            </div>
            <div>
                <img src={whitePawn} alt="White Pawn"/>
            </div>
            <div>
                <img src={whitePawn} alt="White Pawn"/>
            </div>
            <div>
                <img src={whiteRook} alt="White Rook"/>
            </div>
            <div>
                <img src={whiteKnight} alt="White Knight"/>
            </div>
            <div>
                <img src={whiteBishop} alt="White Bishop"/>
            </div>
            <div>
                <img src={whiteQueen} alt="White Queen"/>
            </div>
            <div>
                <img src={whiteKing} alt="White King" />
            </div>
            <div>
                <img src={whiteBishop} alt="White Bishop"/>
            </div>
            <div>
                <img src={whiteKnight} alt="White Knight"/>
            </div>
            <div>
                <img src={whiteRook} alt="White Rook"/>
            </div>
        </div>
    );
}

export default ChessBoard;