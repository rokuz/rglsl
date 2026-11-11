use crate::{CollectiveOperation, Expression, GatherMode, Handle, QuadControl, SubgroupFunction};

impl crate::LoopControl {
    pub fn is_default(&self) -> bool {
        *self == Self::default()
    }
}

impl crate::TileShading {
    pub const fn is_default(&self) -> bool {
        self.rate.is_none() && !self.non_coherent_attachment_read
    }
}

impl crate::FragmentModes {
    pub fn is_default(&self) -> bool {
        *self == Self::default()
    }
}

impl QuadControl {
    pub const fn is_default(&self) -> bool {
        !self.quad_derivatives && !self.require_full_quads
    }
}

impl CollectiveOperation {
    pub const fn partition(&self) -> Option<Handle<Expression>> {
        match *self {
            Self::PartitionedReduce(ballot)
            | Self::PartitionedInclusiveScan(ballot)
            | Self::PartitionedExclusiveScan(ballot) => Some(ballot),
            Self::Reduce | Self::InclusiveScan | Self::ExclusiveScan | Self::ClusteredReduce(_) => {
                None
            }
        }
    }

    pub const fn partition_mut(&mut self) -> Option<&mut Handle<Expression>> {
        match *self {
            Self::PartitionedReduce(ref mut ballot)
            | Self::PartitionedInclusiveScan(ref mut ballot)
            | Self::PartitionedExclusiveScan(ref mut ballot) => Some(ballot),
            Self::Reduce | Self::InclusiveScan | Self::ExclusiveScan | Self::ClusteredReduce(_) => {
                None
            }
        }
    }
}

impl GatherMode {
    pub const fn index(&self) -> Option<Handle<Expression>> {
        match *self {
            Self::BroadcastFirst | Self::QuadSwap(_) => None,
            Self::Broadcast(index)
            | Self::Shuffle(index)
            | Self::ShuffleDown(index)
            | Self::ShuffleUp(index)
            | Self::ShuffleXor(index)
            | Self::QuadBroadcast(index)
            | Self::Rotate { delta: index, .. } => Some(index),
        }
    }

    pub const fn index_mut(&mut self) -> Option<&mut Handle<Expression>> {
        match *self {
            Self::BroadcastFirst | Self::QuadSwap(_) => None,
            Self::Broadcast(ref mut index)
            | Self::Shuffle(ref mut index)
            | Self::ShuffleDown(ref mut index)
            | Self::ShuffleUp(ref mut index)
            | Self::ShuffleXor(ref mut index)
            | Self::QuadBroadcast(ref mut index)
            | Self::Rotate {
                delta: ref mut index,
                ..
            } => Some(index),
        }
    }
}

impl SubgroupFunction {
    pub const fn operands(&self) -> [Option<Handle<Expression>>; 2] {
        match *self {
            Self::Elect => [None, None],
            Self::AllEqual(value)
            | Self::QuadAll(value)
            | Self::QuadAny(value)
            | Self::InverseBallot(value)
            | Self::BallotFindLsb(value)
            | Self::BallotFindMsb(value)
            | Self::Partition(value)
            | Self::KhrBallot(value)
            | Self::KhrReadFirstInvocation(value)
            | Self::KhrAll(value)
            | Self::KhrAny(value)
            | Self::KhrAllEqual(value)
            | Self::Group {
                argument: value, ..
            } => [Some(value), None],
            Self::BallotBitExtract { ballot, index } => [Some(ballot), Some(index)],
            Self::KhrReadInvocation { argument, index } => [Some(argument), Some(index)],
            Self::BallotBitCount {
                ballot,
                ref collective_op,
            } => [Some(ballot), collective_op.partition()],
        }
    }

    pub const fn operands_mut(&mut self) -> [Option<&mut Handle<Expression>>; 2] {
        match *self {
            Self::Elect => [None, None],
            Self::AllEqual(ref mut value)
            | Self::QuadAll(ref mut value)
            | Self::QuadAny(ref mut value)
            | Self::InverseBallot(ref mut value)
            | Self::BallotFindLsb(ref mut value)
            | Self::BallotFindMsb(ref mut value)
            | Self::Partition(ref mut value)
            | Self::KhrBallot(ref mut value)
            | Self::KhrReadFirstInvocation(ref mut value)
            | Self::KhrAll(ref mut value)
            | Self::KhrAny(ref mut value)
            | Self::KhrAllEqual(ref mut value)
            | Self::Group {
                argument: ref mut value,
                ..
            } => [Some(value), None],
            Self::BallotBitExtract {
                ref mut ballot,
                ref mut index,
            } => [Some(ballot), Some(index)],
            Self::KhrReadInvocation {
                ref mut argument,
                ref mut index,
            } => [Some(argument), Some(index)],
            Self::BallotBitCount {
                ref mut ballot,
                ref mut collective_op,
            } => [Some(ballot), collective_op.partition_mut()],
        }
    }
}
