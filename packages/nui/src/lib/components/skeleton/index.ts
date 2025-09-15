import Skeleton from "./skeleton.svelte";
import SkeletonText from "./skeleton-text.svelte";
import SkeletonCard from "./skeleton-card.svelte";
import SkeletonList from "./skeleton-list.svelte";

export {
	Skeleton,
	SkeletonText,
	SkeletonCard,
	SkeletonList,
	//
	Skeleton as Root,
	SkeletonText as Text,
	SkeletonCard as Card,
	SkeletonList as List,
	type SkeletonProps,
	type SkeletonVariant,
	type SkeletonSize,
	type SkeletonAnimation,
	skeletonVariants,
} from "./skeleton.svelte";

export {
	type SkeletonTextProps,
} from "./skeleton-text.svelte";

export {
	type SkeletonCardProps,
} from "./skeleton-card.svelte";

export {
	type SkeletonListProps,
} from "./skeleton-list.svelte";

export default Skeleton;