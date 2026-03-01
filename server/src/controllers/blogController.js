const db = require('../db');
const { sendDbAwareError } = require('../utils/dbError');

// Helper to generate slug
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
};

const getAllBlogs = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM blogs ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        sendDbAwareError(res, 'Error fetching blogs', error);
    }
};

const getBlogBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const { rows } = await db.query('SELECT * FROM blogs WHERE slug = $1', [slug]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        sendDbAwareError(res, 'Error fetching blog by slug', error);
    }
};

const createBlog = async (req, res) => {
    const { title, description, content, author, tags, image_url } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const slug = generateSlug(title);

    try {
        const { rows } = await db.query(
            'INSERT INTO blogs (title, slug, description, content, author, tags, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, slug, description, content, author, tags, image_url]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error creating blog:', error);
        if (error.code === '23505') { // Unique constraint violation for slug
            return res.status(400).json({ error: 'A blog with this title already exists' });
        }
        sendDbAwareError(res, 'Error creating blog', error);
    }
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description, content, author, tags, image_url } = req.body;

    try {
        // Ideally check if blog exists first, but update works too
        // If title changes, should we update slug? For now, let's say keep slug stable for SEO, or make it optional.
        // Let's keep slug stable unless explicitly requested, but for this simple version, let's NOT update slug on edit to preserve URLs.

        const { rows } = await db.query(
            'UPDATE blogs SET title = $1, description = $2, content = $3, author = $4, tags = $5, image_url = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
            [title, description, content, author, tags, image_url, id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        sendDbAwareError(res, 'Error updating blog', error);
    }
};

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount } = await db.query('DELETE FROM blogs WHERE id = $1', [id]);
        if (rowCount === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        sendDbAwareError(res, 'Error deleting blog', error);
    }
};

module.exports = {
    getAllBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog
};
