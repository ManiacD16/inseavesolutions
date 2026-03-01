const getDbErrorResponse = (error) => {
    if (!error) {
        return { status: 500, error: 'Internal server error' };
    }

    if (error.code === '28P01') {
        return {
            status: 503,
            error: 'Database authentication failed. Check DB_USER and DB_PASSWORD in server/.env',
        };
    }

    if (error.code === '3D000') {
        return {
            status: 503,
            error: 'Database not found. Check DB_NAME in server/.env',
        };
    }

    if (error.code === '42P01') {
        return {
            status: 503,
            error: 'Database schema not initialized. Run: npm run db:setup',
        };
    }

    if (error.code === 'ECONNREFUSED') {
        return {
            status: 503,
            error: 'Database server is not reachable. Ensure PostgreSQL is running.',
        };
    }

    return { status: 500, error: 'Internal server error' };
};

const sendDbAwareError = (res, context, error) => {
    const response = getDbErrorResponse(error);
    console.error(`${context}:`, error);
    res.status(response.status).json({ error: response.error });
};

module.exports = {
    getDbErrorResponse,
    sendDbAwareError,
};
