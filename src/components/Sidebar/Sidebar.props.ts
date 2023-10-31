import { BlogTypes } from 'src/interfaces/blogs.interface';
import { CategoriesType } from 'src/interfaces/categories.interface';

export interface SidebarProps {
	latestBlogs: BlogTypes[];
	categories: CategoriesType[];
}
