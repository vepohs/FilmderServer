import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { Request, Response, NextFunction } from 'express';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export const sanitizeInput = (req:Request, res:Response, next:NextFunction) => {

    const sanitizeObject = (obj:any) => {
        if (!obj || typeof obj !== 'object') return;
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = DOMPurify.sanitize(obj[key]);
            }
        }
    };

    sanitizeObject(req.body);

    sanitizeObject(req.query);

    sanitizeObject(req.params);

    sanitizeObject(req.headers);

    next();
};


