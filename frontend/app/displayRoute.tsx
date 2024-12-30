import type { NextApiRequest, NextApiResponse } from "next"

import axios from "axios"

fetch('api/route')
    .then(response => response.json())
    .then(data => console.log("WETH to USD:", data.price))
    .catch(error => console.error('Error fetching data, error'))